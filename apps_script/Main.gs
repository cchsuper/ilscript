// Original WR bolder script written by scatter 2018-11

function onEdit(e) {  
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var col = e.range.getColumn();
  if (sheet.getSheetName() == 'IL Times'){
    if (col != 1){
      boldWR(col, sheet, lastRow);
    }
  }
}

function boldWR(col, sheet, lastRow) {
  var range = sheet.getRange(3, col, lastRow-2, 1);
  var data = range.getDisplayValues();
  var cellsToBold = [];
  bestTime = null;
  higherIsBetter = ([13,14,23,24,27,40,54,55,65,66,68,69,70,83,92,95,99,100,102,103,104].indexOf(col) != -1);

  if (higherIsBetter) {
    for (var i = 0; i < data.length; i++) {
      if (isTimeString(data[i][0])) {
        cellTime = timeStringToSeconds(data[i][0]);
        if (bestTime == null || cellTime > bestTime) {
          bestTime = cellTime;
          cellsToBold = [i];
        }
        else if (cellTime == bestTime) {
          cellsToBold.push(i);
        }
      }
    }
  }
  
  else {
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
  }
  
  for (var i = 0; i < data.length; i++) {
    if (cellsToBold.indexOf(i) != -1) {
      range.getCell(i+1,1).setFontWeight('bold');
    }
    else {
     range.getCell(i+1,1).setFontWeight('normal');
    }
  }
}

function timeStringToSeconds(input) {
  if (input.map) {
    var arrayLength = input.length;
    var output = input;
    for (var i = 0; i < arrayLength; i++) {
      output[i] = timeStringToSeconds(input[i]);
    }
    return output;
  }
  else {
    var nums = input.split(":");
    if (nums.length == 3) {
      output = (parseInt(nums[0]) * 3600 + parseInt(nums[1]) * 60 + parseFloat(nums[2])).toFixed(2);
    }
    else if (nums.length == 2) {
      output = (parseInt(nums[0]) * 60 + parseFloat(nums[1])).toFixed(2);
    }
    else output = parseFloat(input).toFixed(2);
    return parseFloat(output);
  }
}

function isTimeString(str) {
  var regex = /^(\d+:)?(\d{2}:)?(\d+)(\.\d(\d)?)?$/;
  if (regex.exec(str) == null) {
    return false;
  }
  else return true;
}