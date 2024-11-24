// You are given an n x n integer matrix. You can do the following operation any number of times:

// Choose any two adjacent elements of matrix and multiply each of them by -1.
// Two elements are considered adjacent if and only if they share a border.

// Your goal is to maximize the summation of the matrix's elements. Return the maximum sum of the matrix's elements using the operation mentioned above.

// Example 1:

// Input: matrix = [[1,-1],[-1,1]]
// Output: 4
// Explanation: We can follow the following steps to reach sum equals 4:
// - Multiply the 2 elements in the first row by -1.
// - Multiply the 2 elements in the first column by -1.
// Example 2:

// Input: matrix = [[1,2,3],[-1,-2,-3],[1,2,3]]
// Output: 16
// Explanation: We can follow the following step to reach sum equals 16:
// - Multiply the 2 last elements in the second row by -1.

// Constraints:

// n == matrix.length == matrix[i].length
// 2 <= n <= 250
// -105 <= matrix[i][j] <= 105

var maxMatrixSum = function (matrix) {
  let n = matrix.length;
  let totalSum = 0;
  let minAbsValue = Infinity;
  let negativeCount = 0;

  // Iterate through the matrix
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let value = matrix[i][j];
      totalSum += Math.abs(value); // Add the absolute value
      minAbsValue = Math.min(minAbsValue, Math.abs(value)); // Track the smallest absolute value
      if (value < 0) {
        negativeCount++; // Count negative values
      }
    }
  }

  // If the count of negative numbers is even, return the total sum
  // Otherwise, subtract twice the smallest absolute value
  return negativeCount % 2 === 0 ? totalSum : totalSum - 2 * minAbsValue;
};

console.log(
  maxMatrixSum([
    [1, -1],
    [-1, 1],
  ])
); // Output: 4
console.log(
  maxMatrixSum([
    [1, 2, 3],
    [-1, -2, -3],
    [1, 2, 3],
  ])
); // Output: 16
