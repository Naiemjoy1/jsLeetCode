// You are given an integer n.

// Each number from 1 to n is grouped according to the sum of its digits.

// Return the number of groups that have the largest size.

// Example 1:

// Input: n = 13
// Output: 4
// Explanation: There are 9 groups in total, they are grouped according sum of its digits of numbers from 1 to 13:
// [1,10], [2,11], [3,12], [4,13], [5], [6], [7], [8], [9].
// There are 4 groups with largest size.
// Example 2:

// Input: n = 2
// Output: 2
// Explanation: There are 2 groups [1], [2] of size 1.

// Constraints:

// 1 <= n <= 104

var countLargestGroup = function (n) {
  const groups = {};

  // Helper to calculate digit sum
  const digitSum = (num) => {
    return num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + Number(digit), 0);
  };

  // Group numbers by their digit sum
  for (let i = 1; i <= n; i++) {
    const sum = digitSum(i);
    groups[sum] = (groups[sum] || 0) + 1;
  }

  // Find the largest group size
  const maxSize = Math.max(...Object.values(groups));

  // Count how many groups have that size
  let count = 0;
  for (let size of Object.values(groups)) {
    if (size === maxSize) count++;
  }

  return count;
};
console.log(countLargestGroup(13)); // Output: 4
console.log(countLargestGroup(2)); // Output: 2
