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
      passed =
        JSON.stringify(output) === JSON.stringify(expectedOutputs[index]);
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

// Validate whether value is a valid number or not
function validNumber(value) {
  return /^-?[0-9]+(\.[0-9]+)?$/.test(String(value));
}

// Return number of rows and columns of a dataframe
// function dataDimensions(dataframe) {
//   let rows = 0;
//   let columns = 0;
//   try {
//     for (let i = 0; i < dataframe.length; i++) {
//       rows += 1;
//       for (let j = 0; j < dataframe[i].length; j++) {
//         if (i === 0) {
//           columns += 1;
//         }
//       }
//     }
//     if (columns === 0) {
//       columns = -1;
//     }
//     if (rows === 0) {
//       rows = -1;
//     }
//     return [rows, columns];
//   } catch {
//     return [-1, -1];
//   }
// }

// Return number of rows and columns of a dataframe
function dataDimensions(dataframe) {
  let rows = 0;
  let columns = 0;
  try {
    dataframe.forEach((row, index) => {
      rows++;
      try {
        row.forEach(element => {
          columns += index === 1 ? 1 : 0;
        });
      } catch {
        columns = -1;
      }
    });
  } catch {
    return [-1, -1];
  }
  return [dataframe.length, columns];
}

// Testing

const inputs = [
  [
    ['Q1', 1000, 1200, 950],
    ['Q2', 1100, 1300, 975],
    ['Q3', 1200, 1400, 1000],
  ],
  [1000, 1100],
  undefined,
  '', // No data
];
const expectedOutputs = [
  [3, 4],
  [2, -1],
  [-1, -1],
  [-1, -1],
];

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
