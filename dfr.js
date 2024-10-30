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
    ? // Even number of values
      (sortedDataset[numValues / 2 - 1] + sortedDataset[numValues / 2]) / 2
    : // Odd number of values
      sortedDataset[(numValues + 1) / 2 - 1];
}

// Convert all string numbers
function convertToNumber(dataframe, col) {
  let numConverted = 0;
  for (let i = 0; i < dataframe.length; i++) {
    for (let j = 0; j < dataframe[i].length; j++) {
      if (Number(dataframe[i][j]) && j === col) {
        dataframe[i][j] = Number(dataframe[i][j]);
        numConverted++;
      }
    }
  }
  return numConverted;
}

const trafficData = [
  ['protocol', 'requests', 'latency'], // Column indices: 0, 1, 2
  ['tcp', '1000', '2.5'], //                ↓  ↓  ↓
  ['udp', '1500', '1.8'], //                0  1  2
];

console.log(convertToNumber(trafficData, 1)); // → 2 (converted '1000' and '1500' to numbers)

console.log(trafficData);

// Convert string numbers in 'latency' column (index 2)
console.log(convertToNumber(trafficData, 2)); // → 2 (converted '2.5' and '1.8' to numbers)

console.log(trafficData);

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
