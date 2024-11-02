// A fancy string is a string where no three consecutive characters are equal.

// Given a string s, delete the minimum possible number of characters from s to make it fancy.

// Return the final string after the deletion. It can be shown that the answer will always be unique.

// Example 1:

// Input: s = "leeetcode"
// Output: "leetcode"
// Explanation:
// Remove an 'e' from the first group of 'e's to create "leetcode".
// No three consecutive characters are equal, so return "leetcode".
// Example 2:

// Input: s = "aaabaaaa"
// Output: "aabaa"
// Explanation:
// Remove an 'a' from the first group of 'a's to create "aabaaaa".
// Remove two 'a's from the second group of 'a's to create "aabaa".
// No three consecutive characters are equal, so return "aabaa".
// Example 3:

// Input: s = "aab"
// Output: "aab"
// Explanation: No three consecutive characters are equal, so return "aab".

// Constraints:

// 1 <= s.length <= 105
// s consists only of lowercase English letters.

var makeFancyString = function (s) {
  let result = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 1 && s[i] === s[i - 1] && s[i] === s[i - 2]) {
      continue;
    }
    result += s[i];
  }
  return result;
};

console.log(makeFancyString("leeetcode"));
console.log(makeFancyString("aaabaaaa"));
console.log(makeFancyString("aab"));
