// You are given a string s consisting of the characters 'a', 'b', and 'c' and a non-negative integer k. Each minute, you may take either the leftmost character of s, or the rightmost character of s.

// Return the minimum number of minutes needed for you to take at least k of each character, or return -1 if it is not possible to take k of each character.

// Example 1:

// Input: s = "aabaaaacaabc", k = 2
// Output: 8
// Explanation:
// Take three characters from the left of s. You now have two 'a' characters, and one 'b' character.
// Take five characters from the right of s. You now have four 'a' characters, two 'b' characters, and two 'c' characters.
// A total of 3 + 5 = 8 minutes is needed.
// It can be proven that 8 is the minimum number of minutes needed.
// Example 2:

// Input: s = "a", k = 1
// Output: -1
// Explanation: It is not possible to take one 'b' or 'c' so return -1.

// Constraints:

// 1 <= s.length <= 105
// s consists of only the letters 'a', 'b', and 'c'.
// 0 <= k <= s.length

var takeCharacters = function (s, k) {
  // Step 1: Count the frequency of each character in the string
  const count = { a: 0, b: 0, c: 0 };
  for (const char of s) {
    count[char]++;
  }

  // Step 2: If any character appears less than k times, return -1
  if (count["a"] < k || count["b"] < k || count["c"] < k) {
    return -1;
  }

  // Step 3: Use sliding window to find the minimum substring length to remove
  const n = s.length;
  let left = 0;
  let maxWindow = 0; // Maximum valid window size
  const currentCount = { a: 0, b: 0, c: 0 };

  for (let right = 0; right < n; right++) {
    currentCount[s[right]]++;

    // Shrink the window if it contains more than `count[char] - k` of any character
    while (
      currentCount["a"] > count["a"] - k ||
      currentCount["b"] > count["b"] - k ||
      currentCount["c"] > count["c"] - k
    ) {
      currentCount[s[left]]--;
      left++;
    }

    // Update the maximum window size
    maxWindow = Math.max(maxWindow, right - left + 1);
  }

  // Step 4: Calculate the result
  return n - maxWindow;
};
console.log(takeCharacters("aabaaaacaabc", 2));
console.log(takeCharacters("a", 1));
