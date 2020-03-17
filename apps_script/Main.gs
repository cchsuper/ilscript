// Original WR bolder script written by scatter 2018-11
// Updated/Extended by 1UpsForLife 2020-01-09

function ILScriptEntry(e) {  
  var sheet = SpreadsheetApp.getActiveSheet();
  var cell = e.range;
  var sheetName = sheet.getSheetName();
  console.log("Edit made on sheet "+sheetName+", row "+ cell.getRow() +" col "+ cell.getColumn());
  if (sheetName == 'IL Times'){
    if(cell.getColumn() > 1){
      ILbolder(sheet, cell);
    }
  }
  else if(sheetName == 'Any% Best Splits'){
    if(cell.getColumn() > 2){
      AnypBolder(sheet, cell);
    }
  }
  else if(sheetName == '120 Best Splits'){
    if(cell.getColumn() > 1){
      OneTwentyBolder(sheet, cell);
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
  var regex = /^(\d+:)?(\d{2}:)?(\d(\d)?)(\.\d(\d)?)$/;
  if (regex.exec(str) == null) {
    return false;
  }
  else return true;
}