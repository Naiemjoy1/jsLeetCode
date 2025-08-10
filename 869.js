// You are given an integer n. We reorder the digits in any order (including the original order) such that the leading digit is not zero.

// Return true if and only if we can do this so that the resulting number is a power of two.

// Example 1:

// Input: n = 1
// Output: true
// Example 2:

// Input: n = 10
// Output: false

// Constraints:

// 1 <= n <= 109

var reorderedPowerOf2 = function (n) {
  // Helper: turn number into sorted string of digits
  const sortDigits = (num) => num.toString().split("").sort().join("");

  const target = sortDigits(n);

  // Check all powers of 2 up to 10^9
  for (let i = 0; i < 31; i++) {
    const powerStr = sortDigits(1 << i); // 2^i
    if (powerStr === target) return true;
  }
  return false;
};

// Test cases
console.log(reorderedPowerOf2(1)); // true   (2^0 = 1)
console.log(reorderedPowerOf2(10)); // false
console.log(reorderedPowerOf2(16)); // true   (2^4 = 16)
console.log(reorderedPowerOf2(24)); // false
console.log(reorderedPowerOf2(46)); // true   (64 is 2^6)
console.log(reorderedPowerOf2(128)); // true   (2^7 = 128)
