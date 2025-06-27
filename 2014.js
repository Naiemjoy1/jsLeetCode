// You are given a string s of length n, and an integer k. You are tasked to find the longest subsequence repeated k times in string s.

// A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

// A subsequence seq is repeated k times in the string s if seq * k is a subsequence of s, where seq * k represents a string constructed by concatenating seq k times.

// For example, "bba" is repeated 2 times in the string "bababcba", because the string "bbabba", constructed by concatenating "bba" 2 times, is a subsequence of the string "bababcba".
// Return the longest subsequence repeated k times in string s. If multiple such subsequences are found, return the lexicographically largest one. If there is no such subsequence, return an empty string.

// Example 1:

// example 1
// Input: s = "letsleetcode", k = 2
// Output: "let"
// Explanation: There are two longest subsequences repeated 2 times: "let" and "ete".
// "let" is the lexicographically largest one.
// Example 2:

// Input: s = "bb", k = 2
// Output: "b"
// Explanation: The longest subsequence repeated 2 times is "b".
// Example 3:

// Input: s = "ab", k = 2
// Output: ""
// Explanation: There is no subsequence repeated 2 times. Empty string is returned.

// Constraints:

// n == s.length
// 2 <= n, k <= 2000
// 2 <= n < k * 8
// s consists of lowercase English letters.

var longestSubsequenceRepeatedK = function (s, k) {
  const count = {};
  for (let c of s) {
    count[c] = (count[c] || 0) + 1;
  }

  // Filter out chars that can't appear at least k times
  const usable = [];
  for (let c in count) {
    if (count[c] >= k) {
      usable.push(...Array(Math.floor(count[c] / k)).fill(c));
    }
  }

  const chars = usable.sort().reverse(); // for lexicographical ordering

  // Generate permutations in descending lex order (backtracking)
  let res = "";

  const isSubsequence = (target, s) => {
    let i = 0;
    for (let c of s) {
      if (c === target[i]) i++;
      if (i === target.length) return true;
    }
    return false;
  };

  const check = (str) => isSubsequence(str.repeat(k), s);

  const dfs = (path, depth, maxLen) => {
    if (depth > maxLen) return;
    if (path.length > 0 && check(path)) {
      if (
        path.length > res.length ||
        (path.length === res.length && path > res)
      ) {
        res = path;
      }
    }

    for (let c of chars) {
      dfs(path + c, depth + 1, maxLen);
    }
  };

  // Try increasing lengths up to 7 (heuristic; safe within constraints)
  for (let len = 1; len <= 7; len++) {
    dfs("", 0, len);
  }

  return res;
};

console.log(longestSubsequenceRepeatedK("letsleetcode", 2)); // "let"
console.log(longestSubsequenceRepeatedK("bb", 2)); // "b"
console.log(longestSubsequenceRepeatedK("ab", 2)); // ""
