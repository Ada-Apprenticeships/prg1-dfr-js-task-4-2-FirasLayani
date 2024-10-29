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
      if ((typeof element === 'number' || typeof element === 'string') && validNumber(element)) {
        numValues += 1;
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

function calculateMedian(dataset) {}

function convertToNumber(dataframe, col) {}

function flatten(dataframe) {}

function loadCSV(csvFile, ignoreRows, ignoreCols) {}

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
