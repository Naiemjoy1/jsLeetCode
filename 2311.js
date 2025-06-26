// You are given a binary string s and a positive integer k.

// Return the length of the longest subsequence of s that makes up a binary number less than or equal to k.

// Note:

// The subsequence can contain leading zeroes.
// The empty string is considered to be equal to 0.
// A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

// Example 1:

// Input: s = "1001010", k = 5
// Output: 5
// Explanation: The longest subsequence of s that makes up a binary number less than or equal to 5 is "00010", as this number is equal to 2 in decimal.
// Note that "00100" and "00101" are also possible, which are equal to 4 and 5 in decimal, respectively.
// The length of this subsequence is 5, so 5 is returned.
// Example 2:

// Input: s = "00101001", k = 1
// Output: 6
// Explanation: "000001" is the longest subsequence of s that makes up a binary number less than or equal to 1, as this number is equal to 1 in decimal.
// The length of this subsequence is 6, so 6 is returned.

// Constraints:

// 1 <= s.length <= 1000
// s[i] is either '0' or '1'.
// 1 <= k <= 109

var longestSubsequence = function (s, k) {
  let count = 0;
  let value = 0;
  let power = 0;

  // Step 1: Count all zeros first (safe to include)
  for (let i = s.length - 1; i >= 0; i--) {
    const bit = s[i];

    if (bit === "0") {
      count++;
    } else {
      // Only include '1' if the resulting value is still <= k
      if (power < 31 && value + (1 << power) <= k) {
        value += 1 << power;
        count++;
      }
    }

    if (bit === "1") {
      power++;
    }
  }

  return count;
};
console.log(longestSubsequence("1001010", 5)); // Output: 5
console.log(longestSubsequence("00101001", 1)); // Output: 6
