/**
 * Wedding RSVP → this spreadsheet.
 *
 * A 401 HTML sign-in page means this deployment is not anonymous.
 * Editing an old deployment does not make the old URL public.
 *
 *   Deploy → New deployment → gear → Web app
 *   Execute as: Me
 *   Who has access: Anyone     ← not "Anyone with a Google account"
 *   Deploy, authorize, then copy the NEW url ending in /exec
 *   Put that url in Railway as GOOGLE_SHEETS_WEBHOOK_URL and redeploy
 *
 * Setup:
 * 1. Create/open your Google Sheet.
 * 2. Extensions → Apps Script. Paste this file. Save.
 * 3. Project Settings → Script properties → Add:
 *      RSVP_SECRET = same value as GOOGLE_SHEETS_SECRET on Railway
 * 4. Deploy as Web app (settings above). Do not add anything after /exec.
 * 5. Test: open the /exec URL in a private/incognito window.
 *    You should see: {"ok":true,"service":"rsvp"}
 *    If Google asks you to sign in, the access setting is still wrong.
 */
function doGet() {
  return json_({ ok: true, service: "rsvp" });
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: "empty body" });
    }

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
