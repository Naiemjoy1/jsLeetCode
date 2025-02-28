// Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences. If there are multiple valid strings, return any of them.

// A string s is a subsequence of string t if deleting some number of characters from t (possibly 0) results in the string s.

// Example 1:

// Input: str1 = "abac", str2 = "cab"
// Output: "cabac"
// Explanation:
// str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
// str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
// The answer provided is the shortest such string that satisfies these properties.
// Example 2:

// Input: str1 = "aaaaaaaa", str2 = "aaaaaaaa"
// Output: "aaaaaaaa"

// Constraints:

// 1 <= str1.length, str2.length <= 1000
// str1 and str2 consist of lowercase English letters.

var shortestCommonSupersequence = function (str1, str2) {
  let m = str1.length,
    n = str2.length;
  let dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Build the DP table for LCS (Longest Common Subsequence)
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  // Reconstruct the shortest common supersequence from the DP table
  let i = m,
    j = n;
  let result = [];

  while (i > 0 && j > 0) {
    if (str1[i - 1] === str2[j - 1]) {
      result.push(str1[i - 1]);
      i--;
      j--;
    } else if (dp[i - 1][j] > dp[i][j - 1]) {
      result.push(str1[i - 1]);
      i--;
    } else {
      result.push(str2[j - 1]);
      j--;
    }
  }

  while (i > 0) {
    result.push(str1[i - 1]);
    i--;
  }
  while (j > 0) {
    result.push(str2[j - 1]);
    j--;
  }

  return result.reverse().join("");
};
