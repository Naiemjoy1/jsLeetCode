// You are given two integers n and maxValue, which are used to describe an ideal array.

// A 0-indexed integer array arr of length n is considered ideal if the following conditions hold:

// Every arr[i] is a value from 1 to maxValue, for 0 <= i < n.
// Every arr[i] is divisible by arr[i - 1], for 0 < i < n.
// Return the number of distinct ideal arrays of length n. Since the answer may be very large, return it modulo 109 + 7.

// Example 1:

// Input: n = 2, maxValue = 5
// Output: 10
// Explanation: The following are the possible ideal arrays:
// - Arrays starting with the value 1 (5 arrays): [1,1], [1,2], [1,3], [1,4], [1,5]
// - Arrays starting with the value 2 (2 arrays): [2,2], [2,4]
// - Arrays starting with the value 3 (1 array): [3,3]
// - Arrays starting with the value 4 (1 array): [4,4]
// - Arrays starting with the value 5 (1 array): [5,5]
// There are a total of 5 + 2 + 1 + 1 + 1 = 10 distinct ideal arrays.
// Example 2:

// Input: n = 5, maxValue = 3
// Output: 11
// Explanation: The following are the possible ideal arrays:
// - Arrays starting with the value 1 (9 arrays):
//    - With no other distinct values (1 array): [1,1,1,1,1]
//    - With 2nd distinct value 2 (4 arrays): [1,1,1,1,2], [1,1,1,2,2], [1,1,2,2,2], [1,2,2,2,2]
//    - With 2nd distinct value 3 (4 arrays): [1,1,1,1,3], [1,1,1,3,3], [1,1,3,3,3], [1,3,3,3,3]
// - Arrays starting with the value 2 (1 array): [2,2,2,2,2]
// - Arrays starting with the value 3 (1 array): [3,3,3,3,3]
// There are a total of 9 + 1 + 1 = 11 distinct ideal arrays.

// Constraints:

// 2 <= n <= 104
// 1 <= maxValue <= 104

var idealArrays = function (n, maxValue) {
  const MOD = 1e9 + 7;
  const maxLen = 14; // max depth needed for chain given n <= 10^4

  // Precompute combination values C[n][k]
  let comb = Array.from({ length: n + 1 }, () => Array(maxLen + 1).fill(0));
  for (let i = 0; i <= n; i++) {
    comb[i][0] = 1;
    for (let j = 1; j <= maxLen && j <= i; j++) {
      comb[i][j] = (comb[i - 1][j - 1] + comb[i - 1][j]) % MOD;
    }
  }

  // DP: dp[i][l] = number of sequences ending with i of length l
  let dp = Array.from({ length: maxValue + 1 }, () =>
    Array(maxLen + 1).fill(0)
  );
  for (let i = 1; i <= maxValue; i++) dp[i][1] = 1;

  for (let l = 2; l <= maxLen; l++) {
    for (let i = 1; i <= maxValue; i++) {
      for (let j = i * 2; j <= maxValue; j += i) {
        dp[j][l] = (dp[j][l] + dp[i][l - 1]) % MOD;
      }
    }
  }

  let res = 0;
  for (let i = 1; i <= maxValue; i++) {
    for (let l = 1; l <= maxLen; l++) {
      if (comb[n - 1][l - 1] === 0) break;
      res = (res + dp[i][l] * comb[n - 1][l - 1]) % MOD;
    }
  }

  return res;
};
console.log(idealArrays(2, 5)); // Output: 10
console.log(idealArrays(5, 3)); // Output: 11
