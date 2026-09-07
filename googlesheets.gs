/* Google Apps Script — paste this into: Google Sheets > Extensions > Apps Script
   Columns expected in the sheet (Sheet name: "Leads"): 
   Timestamp | Name | Phone | Email | City | Plot Size | Plot Type | Message | Source
   Then Deploy > New deployment > Web app:
     - Execute as: Me
     - Who has access: Anyone
   Copy the /exec URL and give it to update index.html (GOOGLE_SHEETS_URL). */

function doPost(e) {
  var SHEET_NAME = 'Leads';
  try {
    var json = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'City', 'Plot Size', 'Plot Type', 'Message', 'Source']);
    }
    sheet.appendRow([
      json.timestamp || new Date().toISOString(),
      json.name || '',
      json.phone || '',
      json.email || '',
      json.city || '',
      json.plot_size || json.plot || '',
      json.plot_type || '',
      json.message || '',
      json.source || ''
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}