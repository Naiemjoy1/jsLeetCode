// You are given an array of strings words. Each element of words consists of two lowercase English letters.

// Create the longest possible palindrome by selecting some elements from words and concatenating them in any order. Each element can be selected at most once.

// Return the length of the longest palindrome that you can create. If it is impossible to create any palindrome, return 0.

// A palindrome is a string that reads the same forward and backward.

// Example 1:

// Input: words = ["lc","cl","gg"]
// Output: 6
// Explanation: One longest palindrome is "lc" + "gg" + "cl" = "lcggcl", of length 6.
// Note that "clgglc" is another longest palindrome that can be created.
// Example 2:

// Input: words = ["ab","ty","yt","lc","cl","ab"]
// Output: 8
// Explanation: One longest palindrome is "ty" + "lc" + "cl" + "yt" = "tylcclyt", of length 8.
// Note that "lcyttycl" is another longest palindrome that can be created.
// Example 3:

// Input: words = ["cc","ll","xx"]
// Output: 2
// Explanation: One longest palindrome is "cc", of length 2.
// Note that "ll" is another longest palindrome that can be created, and so is "xx".

// Constraints:

// 1 <= words.length <= 105
// words[i].length == 2
// words[i] consists of lowercase English letters.

var longestPalindrome = function (words) {
  const map = new Map();
  let length = 0;
  let hasMiddle = false;

  for (let word of words) {
    const reversed = word[1] + word[0];
    if (map.get(reversed)) {
      // Found a reverse pair
      length += 4;
      map.set(reversed, map.get(reversed) - 1);
      if (map.get(reversed) === 0) map.delete(reversed);
    } else {
      // Add current word to the map
      map.set(word, (map.get(word) || 0) + 1);
    }
  }

  // Now check for remaining palindromic words (like "gg")
  for (let [word, count] of map.entries()) {
    if (word[0] === word[1] && count > 0) {
      hasMiddle = true;
      break;
    }
  }

  return hasMiddle ? length + 2 : length;
};
console.log(longestPalindrome(["lc", "cl", "gg"])); // 6
console.log(longestPalindrome(["ab", "ty", "yt", "lc", "cl", "ab"])); // 8
console.log(longestPalindrome(["cc", "ll", "xx"])); // 2
