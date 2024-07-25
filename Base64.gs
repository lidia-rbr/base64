/**
 * Get data from sheet and open dialog
 */
function convert() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Convert");
  const sheetData = sheet.getDataRange().getValues();
  const headers = sheetData.shift();
  const data = {
    urls: sheetData.map(x => x[headers.indexOf("URLs")])
  };

  let modal = HtmlService.createTemplateFromFile("Convert");
  modal.data = JSON.stringify(data);
  modal = modal.evaluate();
  modal.setHeight(400).setWidth(550);
  SpreadsheetApp.getUi().showModalDialog(modal, "Converting your files...");

}


function printRes(dataUrl, i) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const range = sheet.getRange(i + 2, 2);
  console.log(i)
  console.log(dataUrl)
  range.setValue(dataUrl)
  return i;
}

/**
 * to include css and js code in the HTML files
 * @param {string} filename
 * @returns {string} 
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}