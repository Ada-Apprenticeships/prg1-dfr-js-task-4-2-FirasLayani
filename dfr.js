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

// Return the median of valid numbers in a 1D array
function calculateMedian(dataset) {
  let validDataset = [];
  try {
    // Filter to valid numbers
    dataset.forEach(element => {
      if ((typeof element === 'number' || typeof element === 'string') && validNumber(element)) {
        validDataset.push(Number(element));
      }
    });
  } catch {
    return 0;
  }

  // Sort to ascending numbers
  const sortedDataset = validDataset.sort();

  // Apply median formula
  // odd --> (n+1)/2
  // even --> (n/2 + (n/2 +1))/2
  const numValues = findNumNumbers(dataset); // Number of valid numbers in the dataset
  if (numValues === 0) {
    return 0;
  } else if (numValues % 2 === 0) {
    return (sortedDataset[numValues / 2 - 1] + sortedDataset[numValues / 2]) / 2;
  } else if (numValues % 2 === 1) {
    return sortedDataset[(numValues + 1) / 2 - 1];
  } else {
    return 0;
  }
}
console.log(calculateMedian(''));

testInputs(
  calculateMedian,
  [[1.5, 1.9, 10.0, 50, -10, '3', '1'], [2, 3, 1], [4, 2, 3, 1], [], [''], ''],
  [1.9, 2, 2.5, 0, 0, 0]
);

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
