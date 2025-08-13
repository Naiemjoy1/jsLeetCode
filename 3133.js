// You are given two integers n and x. You have to construct an array of positive integers nums of size n where for every 0 <= i < n - 1, nums[i + 1] is greater than nums[i], and the result of the bitwise AND operation between all elements of nums is x.

// Return the minimum possible value of nums[n - 1].

// Example 1:

// Input: n = 3, x = 4

// Output: 6

// Explanation:

// nums can be [4,5,6] and its last element is 6.

// Example 2:

// Input: n = 2, x = 7

// Output: 15

// Explanation:

// nums can be [7,15] and its last element is 15.

// Constraints:

// 1 <= n, x <= 108

var minEnd = function (n, x) {
  // For n == 1, nums only contains x itself
  if (n === 1) return x;

  // The minimum nums[n - 1] that still satisfies the conditions
  let result = x;

  // Set bits in positions where `x` does not have bits, from least significant
  let bit = 1;
  while (n > 1) {
    if ((x & bit) === 0) {
      // Check if current bit in x is unset
      result |= bit; // Set it in the result
      n--; // Reduce n as we've "added" an element
    }
    bit <<= 1; // Move to the next bit
  }

  return result;
};

console.log(minEnd(3, 4)); // Output: 6
console.log(minEnd(2, 7)); // Output: 15
console.log(minEnd(6715154, 7193485)); // Should be computed efficiently
