// Given a string s consisting only of characters a, b and c.

// Return the number of substrings containing at least one occurrence of all these characters a, b and c.

// Example 1:

// Input: s = "abcabc"
// Output: 10
// Explanation: The substrings containing at least one occurrence of the characters a, b and c are "abc", "abca", "abcab", "abcabc", "bca", "bcab", "bcabc", "cab", "cabc" and "abc" (again).
// Example 2:

// Input: s = "aaacb"
// Output: 3
// Explanation: The substrings containing at least one occurrence of the characters a, b and c are "aaacb", "aacb" and "acb".
// Example 3:

// Input: s = "abc"
// Output: 1

// Constraints:

// 3 <= s.length <= 5 x 10^4
// s only consists of a, b or c characters.

var numberOfSubstrings = function (s) {
  let count = { a: 0, b: 0, c: 0 };
  let left = 0,
    result = 0;

  for (let right = 0; right < s.length; right++) {
    count[s[right]]++;

    while (count["a"] > 0 && count["b"] > 0 && count["c"] > 0) {
      result += s.length - right; // Count substrings
      count[s[left]]--;
      left++;
    }
  }

  return result;
};

// Test cases
console.log(numberOfSubstrings("abcabc")); // Output: 10
console.log(numberOfSubstrings("aaacb")); // Output: 3
console.log(numberOfSubstrings("abc")); // Output: 1
