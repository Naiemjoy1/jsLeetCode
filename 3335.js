// You are given a string s and an integer t, representing the number of transformations to perform. In one transformation, every character in s is replaced according to the following rules:

// If the character is 'z', replace it with the string "ab".
// Otherwise, replace it with the next character in the alphabet. For example, 'a' is replaced with 'b', 'b' is replaced with 'c', and so on.
// Return the length of the resulting string after exactly t transformations.

// Since the answer may be very large, return it modulo 109 + 7.

// Example 1:

// Input: s = "abcyy", t = 2

// Output: 7

// Explanation:

// First Transformation (t = 1):
// 'a' becomes 'b'
// 'b' becomes 'c'
// 'c' becomes 'd'
// 'y' becomes 'z'
// 'y' becomes 'z'
// String after the first transformation: "bcdzz"
// Second Transformation (t = 2):
// 'b' becomes 'c'
// 'c' becomes 'd'
// 'd' becomes 'e'
// 'z' becomes "ab"
// 'z' becomes "ab"
// String after the second transformation: "cdeabab"
// Final Length of the string: The string is "cdeabab", which has 7 characters.
// Example 2:

// Input: s = "azbk", t = 1

// Output: 5

// Explanation:

// First Transformation (t = 1):
// 'a' becomes 'b'
// 'z' becomes "ab"
// 'b' becomes 'c'
// 'k' becomes 'l'
// String after the first transformation: "babcl"
// Final Length of the string: The string is "babcl", which has 5 characters.

// Constraints:

// 1 <= s.length <= 105
// s consists only of lowercase English letters.
// 1 <= t <= 105

var lengthAfterTransformations = function (s, t) {
  const MOD = 1e9 + 7;
  let count = new Array(26).fill(0);

  // Initialize count for each character
  for (let char of s) {
    count[char.charCodeAt(0) - 97]++;
  }

  // Perform t transformations
  for (let i = 0; i < t; i++) {
    let newCount = new Array(26).fill(0);
    for (let j = 0; j < 26; j++) {
      if (j === 25) {
        // 'z' becomes 'a' and 'b'
        newCount[0] = (newCount[0] + count[j]) % MOD;
        newCount[1] = (newCount[1] + count[j]) % MOD;
      } else {
        // Other characters become next character
        newCount[j + 1] = (newCount[j + 1] + count[j]) % MOD;
      }
    }
    count = newCount;
  }

  // Total length is the sum of all character counts
  return count.reduce((a, b) => (a + b) % MOD, 0);
};
console.log(lengthAfterTransformations("abcyy", 2)); // Output: 7
console.log(lengthAfterTransformations("azbk", 1)); // Output: 5
