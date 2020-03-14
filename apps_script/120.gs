// Original WR bolder script written by scatter 2018-11
// Updated/Extended by 1UpsForLife 2020-01-09

function OneTwentyBolder(sheet, cell) {
  console.log("inside 120bolder");
  var col = cell.getColumn();
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(2, col, lastRow-1, 1);
  var data = range.getDisplayValues();
  var cellsToBold = [];
  bestTime = null;
  
  for (var i = 0; i < data.length; i++) {
    if (isTimeString(data[i][0])) {
      cellTime = timeStringToSeconds(data[i][0]);
      if (bestTime == null || cellTime < bestTime) {
        bestTime = cellTime;
        cellsToBold = [i];
      }
      else if (cellTime == bestTime) {
        cellsToBold.push(i);
      }
    }
  }
  
  for (var i = 0; i < data.length; i++) {
    if (cellsToBold.indexOf(i) != -1) {
    }
    else {
      range.getCell(i+1,1).setFontWeight('normal');
      range.getCell(i+1,1).setBorder(false,false,false,false,false,false);
    }
  }
  for (var i=0;i<data.length;i++){
    if (cellsToBold.indexOf(i) != -1) {
      range.getCell(i+1,1).setFontWeight('bold');
      if(i==0){
        range.getCell(i+1,1).setBorder(false,false,true,false,false,false,"#000000",SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
      }
      else{
        range.getCell(i+1,1).setBorder(false,false,true,false,false,false,"#000000",SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
      }
    }
  }
}
