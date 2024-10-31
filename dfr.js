const fs = require('fs');

function fileExists(filename) {
  return fs.existsSync(filename);
}

function testInputs(funcName, arrayInputs, expectedOutputs) {
  const results = arrayInputs.map((input, index) => {
    let output;
    let passed;
    try {
      output = funcName(input);
      passed = JSON.stringify(output) === JSON.stringify(expectedOutputs[index]);
    } catch (error) {
      output = `Error: ${error.message}`;
      passed = false;
    }
    return {
      Input: input,
      Output: output,
      Expected: expectedOutputs[index],
      Passed: passed,
    };
  });

  console.table(results, ['Input', 'Output', 'Expected', 'Passed']);
}

// Validate whether a value is a valid number or not
function validNumber(value) {
  return /^-?[0-9]+(\.[0-9]+)?$/.test(String(value));
}

// Returns [rows, columns] of a 2D array or [-1, -1] if input is invalid
function dataDimensions(dataframe) {
  try {
    const rows = dataframe.length;
    const columns = dataframe[0].length === undefined ? -1 : dataframe[0].length;
    return [rows, columns];
  } catch {
    return [-1, -1];
  }
}

// Return the total of all valid numbers in a 1D array
function findTotal(dataset) {
  let total = 0;
  try {
    dataset.forEach(element => {
      // Ensure only numbers or numeric strings are included as valid numbers. Ignore arrays such as [1] to prevent auto-casting to a string in validNumber()
      if ((typeof element === 'number' || typeof element === 'string') && validNumber(element)) {
        total += Number(element);
      }
    });
    return total;
  } catch {
    return 0;
  }
}

// Return the number of valid numbers in a 1D array
function findNumNumbers(dataset) {
  try {
    let numValues = 0;
    dataset.forEach(element => {
      // Ensure only numbers or numeric strings are included as valid numbers. Ignore arrays such as [1] to prevent auto-casting to a string in validNumber()
      if ((typeof element === 'number' || typeof element === 'string') && validNumber(element)) {
        numValues++;
      }
    });
    return numValues;
  } catch {
    return 0;
  }
}

// Return the mean of all valid numbers in a 1D array
function calculateMean(dataset) {
  try {
    return findNumNumbers(dataset) === 0 ? 0 : findTotal(dataset) / findNumNumbers(dataset);
  } catch {
    return 0;
  }
}

// Return the median of valid numbers in a 1D array
function calculateMedian(dataset) {
  if (!Array.isArray(dataset)) {
    return 0;
  }

  // Filter dataset to contain only valid numbers
  let validDataset = [];
  dataset.forEach(element => {
    // Ensure only numbers or numeric strings are included as valid numbers. Ignore arrays such as [1] to prevent auto-casting to a string in validNumber()
    if ((typeof element === 'number' || typeof element === 'string') && validNumber(element)) {
      validDataset.push(Number(element));
    }
  });

  // Sort valid dataset in ascending order
  const sortedDataset = validDataset.sort((a, b) => a - b);
  const numValues = validDataset.length;

  // Return 0 if no valid numbers are found
  if (numValues === 0) {
    return 0;
  }

  return numValues % 2 === 0
    ? // Return median for even number of values
      (sortedDataset[numValues / 2 - 1] + sortedDataset[numValues / 2]) / 2
    : // Return median for odd number of values
      sortedDataset[(numValues + 1) / 2 - 1];
}

// Convert all string numbers to actual numbers in a specified column
function convertToNumber(dataframe, col) {
  let numConverted = 0;
  // Iterate through each row
  for (let row of dataframe) {
    if (validNumber(row[col])) {
      row[col] = Number(row[col]); // If the element as a number is valid, cast it to a Number
      numConverted++;
    }
  }
  return numConverted;
}

// Convert a single-column dataframe into a dataset
function flatten(dataframe) {
  // Check if dataframe is single-column
  for (let i = 0; i < dataframe.length; i++) {
    if (!Array.isArray(dataframe[i]) || dataframe[i].length !== 1) {
      // If any sub-array is invalid i.e. not in form [element], return an empty array
      return [];
    }
  }
  // Return an array containing the first element from each sub-array
  return dataframe.map(array => array[0]);
}

function loadCSV(csvFile, ignoreRows, ignoreCols) {
  // Ensure loaded file exists and ignored rows/columns are in array format
  if (!fileExists(csvFile) || !Array.isArray(ignoreRows) || !Array.isArray(ignoreCols)) {
    return [[], -1, -1];
  }

  // Read in the file and remove any whitespace
  const data = fs.readFileSync(csvFile, 'utf-8').trim();

  // Return an empty array if there is no data in the CSV file
  if (!data) {
    return [[], -1, -1];
  }

  const lines = data.split(/\n/); // An array of lines in the file
  const rows = lines.length;
  const columns = lines[0].split(',').length;
  let newDataFrame = [];

  // Iterate through each line in the file
  lines.forEach((line, rowIndex) => {
    // If the line's index is not included in the row indexes to ignore
    if (!ignoreRows.includes(rowIndex)) {
      // Create a new line
      let newLine = [];
      // Iterate through each element in the line
      line.split(',').forEach((element, colIndex) => {
        // If this element's index is not included in the column indexes to ignore
        if (!ignoreCols.includes(colIndex)) {
          // Push the element to the new line
          newLine.push(element);
        }
      });
      // Push each new line to the new dataframe
      newDataFrame.push(newLine);
    }
  });
  return [newDataFrame, rows, columns];
}

console.log(loadCSV('sales_data.csv', [0], [1]));

function createSlice(dataframe, columnIndex, pattern, exportColumns = []) {}

module.exports = {
  fileExists,
  validNumber,
  dataDimensions,
  calculateMean,
  findTotal,
  convertToNumber,
  flatten,
  loadCSV,
  calculateMedian,
  createSlice,
};
