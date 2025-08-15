// Given an integer n, return true if it is a power of four. Otherwise, return false.

// An integer n is a power of four, if there exists an integer x such that n == 4x.

// Example 1:

// Input: n = 16
// Output: true
// Example 2:

// Input: n = 5
// Output: false
// Example 3:

// Input: n = 1
// Output: true

// Constraints:

// -231 <= n <= 231 - 1

var isPowerOfFour = function (n) {
  if (n <= 0) return false;
  return (n & (n - 1)) === 0 && (n - 1) % 3 === 0;
};

// Examples
console.log(isPowerOfFour(16)); // true
console.log(isPowerOfFour(5)); // false
console.log(isPowerOfFour(1)); // true
