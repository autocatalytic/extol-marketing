// Paste this into your Google Apps Script editor
// (Extensions > Apps Script from the Google Sheet)
//
// Sheet ID: 1h092uDWsH3FHZAhtnQEc8Mp4EuhSZSnJhLuBIAhiTYU
//
// After pasting, redeploy as web app:
//   Deploy > New deployment > Web app
//   Execute as: Me
//   Who has access: Anyone
//
// Update the APPS_SCRIPT_URL in the site if the deployment URL changes.

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  // Ensure header row exists
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'email', 'slug', 'utm_source', 'utm_medium',
      'utm_campaign', 'utm_content', 'ref', 'timestamp'
    ]);
  }

  sheet.appendRow([
    data.email || '',
    data.slug || '',
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || '',
    data.utm_content || '',
    data.ref || '',
    data.timestamp || new Date().toISOString(),
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
