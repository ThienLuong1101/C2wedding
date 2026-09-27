/**
 * Wedding RSVP → this spreadsheet.
 *
 * Setup:
 * 1. Create a Google Sheet (or open the one you want).
 * 2. Extensions → Apps Script. Replace the default file with this script. Save.
 * 3. Project Settings → Script properties → Add:
 *      Property: RSVP_SECRET
 *      Value:    a long random string (same value as GOOGLE_SHEETS_SECRET in .env)
 * 4. Deploy → New deployment → Select type: Web app
 *      Execute as: Me
 *      Who has access: Anyone
 * 5. Copy the Web app URL into GOOGLE_SHEETS_WEBHOOK_URL.
 *    Each new RSVP is appended on the "RSVPs" tab.
 *
 * Skip this script if you use a Google Cloud service account instead
 * (GOOGLE_SHEET_ID + GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY).
 */
function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);
    var expected = PropertiesService.getScriptProperties().getProperty("RSVP_SECRET");
    if (!expected || body.secret !== expected) {
      return json_({ ok: false, error: "unauthorized" });
    }

    var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = spreadsheet.getSheetByName("RSVPs");
    if (!sheet) sheet = spreadsheet.insertSheet("RSVPs");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Submitted at", "Name", "Contact", "Attending", "Guests", "Note"]);
      sheet.getRange(1, 1, 1, 6).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      body.submittedAt || new Date(),
      body.name || "",
      body.contact || "",
      body.attending === "yes" ? "Yes" : "No",
      Number(body.guests) || 0,
      body.message || "",
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
