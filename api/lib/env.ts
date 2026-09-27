import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value && process.env.NODE_ENV === "production") {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value ?? "";
}

function optional(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export const env = {
  appId: required("APP_ID"),
  appSecret: required("APP_SECRET"),
  isProduction: process.env.NODE_ENV === "production",
  databaseUrl: required("DATABASE_URL"),
  googleSheetId: optional("GOOGLE_SHEET_ID"),
  googleSheetTab: optional("GOOGLE_SHEET_TAB") || "RSVPs",
  googleServiceAccountEmail: optional("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
  googleServiceAccountPrivateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "",
  googleSheetsWebhookUrl: optional("GOOGLE_SHEETS_WEBHOOK_URL"),
  googleSheetsSecret: optional("GOOGLE_SHEETS_SECRET"),
};
