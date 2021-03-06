// Original WR bolder script written by scatter 2018-11
// Updated/Extended by 1UpsForLife 2020-01-09, 2020-02-26, 2020-03-16

function ILbolder(sheet, cell) {
  var col = cell.getColumn();
  var lastRow = sheet.getLastRow();
  var range = sheet.getRange(4, col, lastRow-3, 1);
  var data = range.getDisplayValues();
  var cellsToBold = [];
  bestTime = null;
  higherIsBetter = ([12,13,14,15,24,25,28,41,42,56,57,67,68,70,71,72,85,94,97,102,103,105,106,107].indexOf(col) != -1);

  for (var i = 0; i < data.length; i++) {
    
    if (isTimeString(data[i][0])) {
      var formula = range.getCell(i+1,1).getFormula();
      
      if (formula.length > 0){
        if(formula.substring(0,10) == "=HYPERLINK"){
          range.getCell(i+1,1).setFontColor("#1155cc");
          range.getCell(i+1,1).setFontLine("underline");
          
          cellTime = timeStringToSeconds(data[i][0]);
          if ( (higherIsBetter==false) && (bestTime == null || cellTime < bestTime)) {
            bestTime = cellTime;
            cellsToBold = [i];
          }
          else if( (higherIsBetter==true) && (bestTime == null || cellTime > bestTime) ){
            bestTime = cellTime;
            cellsToBold = [i];
          }
          else if (cellTime == bestTime) {
            cellsToBold.push(i);
          }
        }
      }
      else{
        range.getCell(i+1,1).setFontColor("#000000");
      }
      
    }
    else if(data[i][0] != ""){
      range.getCell(i+1,1).setFontColor("#990000");
    }
  }
  
  //setting cell styles
  for (var i = 0; i < data.length; i++) {
    if (cellsToBold.indexOf(i) != -1) {
      range.getCell(i+1,1).setFontWeight('bold');
      range.getCell(i+1,1).setBorder(null,false,true,false,false,false,"#000000",SpreadsheetApp.BorderStyle.SOLID_MEDIUM);
    }
    else {
      range.getCell(i+1,1).setFontWeight('normal');
      range.getCell(i+1,1).setBorder(null,false,false,false,false,false);
    }
  }
  
}