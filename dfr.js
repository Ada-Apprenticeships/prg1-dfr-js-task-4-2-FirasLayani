const fs = require('fs');

function fileExists(filename) {
  return fs.existsSync(filename);
}

/*
function testInputs(funcName, arrayInputs) {
  console.log(`Testing function ${funcName.name}()`);
  for (const input of arrayInputs) {
    try {
      console.log(`Input ${input} --> ${funcName(input)}`);
    } catch (error) {
      console.log(`Input ${input} had error: ${error.message}`);
    }
  }
}
*/

function testInputs(funcName, arrayInputs, expectedOutputs) {
  const results = arrayInputs.map((input, index) => {
    let output;
    let passed;
    try {
      output = funcName(input);
      passed = output === expectedOutputs[index];
    } catch (error) {
      output = `Error: ${error.message}`;
      passed = false;
    }
    return { Input: input, Output: output, Passed: passed };
  });

  console.table(results, ['Input', 'Output', 'Passed']);
}

// refactor by removing variable assignment
function validNumber(value) {
  numberRegex = /^-?[0-9]+(\.[0-9]+)?$/;
  return numberRegex.test(String(value));
}

// put iterator in for loop
function dataDimensions(dataframe) {
  let rows = 0;
  let columns = 0;
  for (let i = 0; i < dataframe.length; i++) {
    rows += 1;
    for (let j = 0; j < dataframe[i].length; j++) {
      columns += 1;
    }
  }
  return [rows, columns];
}

// Testing

const inputs = [
  [
    [1000, 1100, 1200],
    [1300, 1400, 1500],
    [1600, 1700, 1800, 1900],
  ], // salesData
  [1000, 1100], // Single-dimensional array
  undefined, // No data
];
const expectedOutputs = [
  [3, 4], // Corresponding to salesData
  [2, -1], // Corresponding to a dataset with 2 elements
  [-1, -1], // Corresponding to no data
];

// Assuming dataDimensions is your function to test
testInputs(dataDimensions, inputs, expectedOutputs);






function findTotal(dataset) {}

function calculateMean(dataset) {}

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
