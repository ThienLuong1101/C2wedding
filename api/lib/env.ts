import "dotenv/config";

function optional(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export const env = {
  // Kept for compatibility with the template; not required for the wedding RSVP flow.
  appId: optional("APP_ID") || "wedding",
  appSecret: optional("APP_SECRET") || "wedding-local-secret",
  isProduction: process.env.NODE_ENV === "production",
  // Optional — RSVPs can go to Google Sheets only.
  databaseUrl: optional("DATABASE_URL"),
  googleSheetId: optional("GOOGLE_SHEET_ID"),
  googleSheetTab: optional("GOOGLE_SHEET_TAB") || "RSVPs",
  googleServiceAccountEmail: optional("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
  googleServiceAccountPrivateKey: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY ?? "",
  googleSheetsWebhookUrl: optional("GOOGLE_SHEETS_WEBHOOK_URL"),
  googleSheetsSecret: optional("GOOGLE_SHEETS_SECRET"),
};
