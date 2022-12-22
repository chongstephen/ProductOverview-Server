function parseCSV(csv) {
  //Split csv string into array of lines
  let lines = csv.split('\n');
  //Split first line (header) into array of column titles
  let columns = lines[0].split(',');
  //Create an array to store the parsed data
  let data = [];
  //Loop through each line of csv
  for (let i = 1; i < lines.length; i++) {
    //Split line into array of values
    let values = lines[i].split(',');
    //Create an object to store the parsed data
    let row = {};
    //Loop through each value
    for (let j = 0; j < values.length; j++) {
      //Assign value to the corresponding column title
      row[columns[j]] = values[j];
    }
    //Add row object to data array
    data.push(row);
  }
  //Return parsed data
  return data;
}