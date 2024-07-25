function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("Custom")
    .addItem("Set row under review", "setRowUnderReview")
    .addItem("Convert", "convert")
    .addToUi();

}

class Content {
  constructor(row, content, type, details, owner, status, postDate, file, notes) {
    this.row = row;
    this.content = content;
    this.type = type;
    this.details = details;
    this.owner = owner;
    this.status = status;
    this.postDate = postDate;
    this.file = file;
    this.notes = notes
  }

  setStatus(status) {
    const sheet = SpreadsheetApp.getActiveSheet();
    sheet.getRange(this.row, 5).setValue([status]);
  }

  setUnderReview() {
    this.setStatus("Under review");
  }
}

function setRowUnderReview() {
  const active = SpreadsheetApp.getActiveRange();
  const rowIndex = active.getRow();
  const contents = getContents();

  let content = contents.find(c=>c.row===rowIndex);
  console.log(content)
  if (content) {
    content.setUnderReview();
  }
}

function getContents() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const contents = [];
  for (let i = 0; i < data.length; i++) {
    contents.push(new Content(i + 1, data[i][0], data[i][1], data[i][2], data[i][3], data[i][4], data[i][5], data[i][6], data[i][7]))
  }
  return contents;
}

