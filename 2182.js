// You are given a string s and an integer repeatLimit. Construct a new string repeatLimitedString using the characters of s such that no letter appears more than repeatLimit times in a row. You do not have to use all characters from s.

// Return the lexicographically largest repeatLimitedString possible.

// A string a is lexicographically larger than a string b if in the first position where a and b differ, string a has a letter that appears later in the alphabet than the corresponding letter in b. If the first min(a.length, b.length) characters do not differ, then the longer string is the lexicographically larger one.

// Example 1:

// Input: s = "cczazcc", repeatLimit = 3
// Output: "zzcccac"
// Explanation: We use all of the characters from s to construct the repeatLimitedString "zzcccac".
// The letter 'a' appears at most 1 time in a row.
// The letter 'c' appears at most 3 times in a row.
// The letter 'z' appears at most 2 times in a row.
// Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
// The string is the lexicographically largest repeatLimitedString possible so we return "zzcccac".
// Note that the string "zzcccca" is lexicographically larger but the letter 'c' appears more than 3 times in a row, so it is not a valid repeatLimitedString.
// Example 2:

// Input: s = "aababab", repeatLimit = 2
// Output: "bbabaa"
// Explanation: We use only some of the characters from s to construct the repeatLimitedString "bbabaa".
// The letter 'a' appears at most 2 times in a row.
// The letter 'b' appears at most 2 times in a row.
// Hence, no letter appears more than repeatLimit times in a row and the string is a valid repeatLimitedString.
// The string is the lexicographically largest repeatLimitedString possible so we return "bbabaa".
// Note that the string "bbabaaa" is lexicographically larger but the letter 'a' appears more than 2 times in a row, so it is not a valid repeatLimitedString.

// Constraints:

// 1 <= repeatLimit <= s.length <= 105
// s consists of lowercase English letters.

var repeatLimitedString = function (s, repeatLimit) {
  // Count the frequency of each character
  let frequency = new Array(26).fill(0);
  for (let char of s) {
    frequency[char.charCodeAt(0) - "a".charCodeAt(0)]++;
  }

  // Result string array
  let result = [];

  // Iterate from the largest character ('z') to the smallest ('a')
  for (let i = 25; i >= 0; ) {
    if (frequency[i] === 0) {
      i--; // Move to the next smaller character
      continue;
    }

    let count = Math.min(frequency[i], repeatLimit); // Use up to repeatLimit of this character
    frequency[i] -= count;

    // Append the character to the result count times
    result.push(String.fromCharCode("a".charCodeAt(0) + i).repeat(count));

    // If we used all occurrences of this character, move to the next one
    if (frequency[i] === 0) {
      i--;
      continue;
    }

    // Find the next smaller character with remaining frequency
    let nextIndex = i - 1;
    while (nextIndex >= 0 && frequency[nextIndex] === 0) {
      nextIndex--;
    }

    if (nextIndex < 0) {
      break; // No smaller characters available to alternate
    }

    // Append one occurrence of the smaller character to break the sequence
    result.push(String.fromCharCode("a".charCodeAt(0) + nextIndex));
    frequency[nextIndex]--;
  }

  // Join and return the result
  return result.join("");
};
