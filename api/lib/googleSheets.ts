import { createSign } from "node:crypto";
import { env } from "./env";

const SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const HEADERS = ["Submitted at", "Name", "Contact", "Attending", "Guests", "Note"] as const;

export type RsvpSheetRow = {
  name: string;
  contact: string;
  attending: "yes" | "no";
  guests: number;
  message: string;
};

type SheetProps = { sheetId: number; title: string };
type SpreadsheetMeta = { sheets?: { properties: SheetProps }[] };

let tokenCache: { token: string; exp: number } | null = null;
let headerReady = false;

function apiReady() {
  return Boolean(env.googleSheetId && env.googleServiceAccountEmail && env.googleServiceAccountPrivateKey);
}

function webhookReady() {
  return Boolean(env.googleSheetsWebhookUrl && env.googleSheetsSecret);
}

export function isGoogleSheetsConfigured() {
  return apiReady() || webhookReady();
}

export function formatSubmittedAt(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kuala_Lumpur",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}`;
}

function rowValues(row: RsvpSheetRow) {
  return [
    formatSubmittedAt(),
    row.name,
    row.contact,
    row.attending === "yes" ? "Yes" : "No",
    row.attending === "yes" ? row.guests : 0,
    row.message,
  ];
}

function normalizePrivateKey(key: string) {
  const unquoted = key.trim().replace(/^["']|["']$/g, "");
  return unquoted.replace(/\\n/g, "\n");
}

function signServiceAccountJwt(email: string, privateKey: string) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const payload = Buffer.from(
    JSON.stringify({
      iss: email,
      scope: SHEETS_SCOPE,
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    }),
  ).toString("base64url");
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${payload}`);
  signer.end();
  const signature = signer.sign(normalizePrivateKey(privateKey), "base64url");
  return `${header}.${payload}.${signature}`;
}

async function getAccessToken() {
  const now = Date.now();
  if (tokenCache && tokenCache.exp > now + 60_000) return tokenCache.token;

  const assertion = signServiceAccountJwt(env.googleServiceAccountEmail, env.googleServiceAccountPrivateKey);
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Google auth failed (${res.status}): ${text.slice(0, 300)}`);
  }
  const data = JSON.parse(text) as { access_token?: string; expires_in?: number };
  if (!data.access_token) throw new Error("Google auth did not return an access token.");
  tokenCache = { token: data.access_token, exp: now + (data.expires_in ?? 3600) * 1000 };
  return data.access_token;
}

async function sheetsFetch<T>(token: string, url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`Google Sheets request failed (${res.status}): ${text.slice(0, 400)}`);
  }
  return (text ? JSON.parse(text) : {}) as T;
}

async function ensureTab(token: string, spreadsheetId: string, title: string) {
  const meta = await sheetsFetch<SpreadsheetMeta>(
    token,
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties(sheetId,title)`,
  );
  const existing = meta.sheets?.find((sheet) => sheet.properties.title === title);
  if (existing) return existing.properties.sheetId;

  const created = await sheetsFetch<{ replies?: { addSheet?: { properties?: { sheetId?: number } } }[] }>(
    token,
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`,
    {
      method: "POST",
      body: JSON.stringify({ requests: [{ addSheet: { properties: { title } } }] }),
    },
  );
  const sheetId = created.replies?.[0]?.addSheet?.properties?.sheetId;
  if (sheetId == null) throw new Error(`Could not create the "${title}" tab.`);
  return sheetId;
}

async function ensureHeader(token: string, spreadsheetId: string, title: string, sheetId: number) {
  if (headerReady) return;
  const range = encodeURIComponent(`${title}!A1:F1`);
  const current = await sheetsFetch<{ values?: string[][] }>(
    token,
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}`,
  );
  if (!current.values?.[0]?.[0]) {
    await sheetsFetch(
      token,
      `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?valueInputOption=RAW`,
      { method: "PUT", body: JSON.stringify({ values: [HEADERS] }) },
    );
    await sheetsFetch(token, `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`, {
      method: "POST",
      body: JSON.stringify({
        requests: [
          {
            repeatCell: {
              range: { sheetId, startRowIndex: 0, endRowIndex: 1, startColumnIndex: 0, endColumnIndex: HEADERS.length },
              cell: { userEnteredFormat: { textFormat: { bold: true } } },
              fields: "userEnteredFormat.textFormat.bold",
            },
          },
          {
            updateSheetProperties: {
              properties: { sheetId, gridProperties: { frozenRowCount: 1 } },
              fields: "gridProperties.frozenRowCount",
            },
          },
        ],
      }),
    });
  }
  headerReady = true;
}

async function appendViaApi(row: RsvpSheetRow) {
  const token = await getAccessToken();
  const spreadsheetId = env.googleSheetId;
  const title = env.googleSheetTab || "RSVPs";
  const sheetId = await ensureTab(token, spreadsheetId, title);
  await ensureHeader(token, spreadsheetId, title, sheetId);
  const range = encodeURIComponent(`${title}!A1`);
  await sheetsFetch(
    token,
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    { method: "POST", body: JSON.stringify({ values: [rowValues(row)] }) },
  );
}

const SIGN_IN_PAGE = /accounts\.google\.com|<!DOCTYPE html|<html/i;

function assertPublicWebhookUrl(url: string) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not a valid URL.");
  }
  const exec = parsed.hostname === "script.google.com" && /\/macros\/s\/[^/]+\/exec$/.test(parsed.pathname);
  if (!exec) {
    throw new Error(
      "GOOGLE_SHEETS_WEBHOOK_URL must be the Apps Script web app URL ending in /exec. /dev URLs and any extra path after /exec require a Google sign-in.",
    );
  }
}

function isSignInPage(text: string) {
  return SIGN_IN_PAGE.test(text);
}

function signInError() {
  return new Error(
    "Google Sheets webhook is showing a sign-in page. In Apps Script choose Deploy → New deployment → Web app, Execute as: Me, Who has access: Anyone. Copy the new /exec URL into GOOGLE_SHEETS_WEBHOOK_URL. Editing an old deployment keeps the old URL private.",
  );
}

function cookieHeader(res: Response) {
  const setCookies = typeof res.headers.getSetCookie === "function" ? res.headers.getSetCookie() : [];
  const fallback = res.headers.get("set-cookie");
  const all = setCookies.length > 0 ? setCookies : fallback ? [fallback] : [];
  return all
    .map((cookie) => cookie.split(";")[0]?.trim())
    .filter(Boolean)
    .join("; ");
}

function assertWebhookBody(text: string) {
  if (isSignInPage(text)) throw signInError();
  if (!text) return;
  try {
    const data = JSON.parse(text) as { ok?: boolean; error?: string };
    if (data.ok === false) throw new Error(data.error || "Google Sheets webhook rejected the RSVP.");
  } catch (error) {
    if (error instanceof SyntaxError) return;
    throw error;
  }
}

async function appendViaWebhook(row: RsvpSheetRow) {
  assertPublicWebhookUrl(env.googleSheetsWebhookUrl);
  const payload = JSON.stringify({
    secret: env.googleSheetsSecret,
    submittedAt: formatSubmittedAt(),
    name: row.name,
    contact: row.contact,
    attending: row.attending,
    guests: row.attending === "yes" ? row.guests : 0,
    message: row.message,
  });

  // Apps Script runs doPost on the first request, then 302s to script.googleusercontent.com.
  // That echo URL must be fetched with GET. A second POST returns 405, and fetch drops the
  // Set-Cookie from the 302, which comes back as a 401 sign-in page.
  let res = await fetch(env.googleSheetsWebhookUrl, {
    method: "POST",
    redirect: "manual",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: payload,
  });

  let cookie = cookieHeader(res);
  for (let hop = 0; hop < 4 && res.status >= 300 && res.status < 400; hop++) {
    const location = res.headers.get("location") ?? "";
    if (!location || /accounts\.google\.com/i.test(location)) throw signInError();
    const nextCookie = cookieHeader(res);
    if (nextCookie) cookie = cookie ? `${cookie}; ${nextCookie}` : nextCookie;
    res = await fetch(location, {
      method: "GET",
      redirect: "manual",
      headers: cookie ? { Cookie: cookie } : {},
    });
  }

  const text = await res.text();
  if (res.status === 401 || res.status === 403 || isSignInPage(text)) throw signInError();
  if (!res.ok) {
    throw new Error(`Google Sheets webhook failed (${res.status}): ${text.slice(0, 300)}`);
  }
  assertWebhookBody(text);
}

export async function appendRsvpToSheet(row: RsvpSheetRow) {
  if (apiReady()) {
    await appendViaApi(row);
    return;
  }
  if (webhookReady()) {
    await appendViaWebhook(row);
    return;
  }
  throw new Error("Google Sheets RSVP is not configured.");
}
