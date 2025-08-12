// Given two positive integers n and x.

// Return the number of ways n can be expressed as the sum of the xth power of unique positive integers, in other words, the number of sets of unique integers [n1, n2, ..., nk] where n = n1x + n2x + ... + nkx.

// Since the result can be very large, return it modulo 109 + 7.

// For example, if n = 160 and x = 3, one way to express n is n = 23 + 33 + 53.

// Example 1:

// Input: n = 10, x = 2
// Output: 1
// Explanation: We can express n as the following: n = 32 + 12 = 10.
// It can be shown that it is the only way to express 10 as the sum of the 2nd power of unique integers.
// Example 2:

// Input: n = 4, x = 1
// Output: 2
// Explanation: We can express n in the following ways:
// - n = 41 = 4.
// - n = 31 + 11 = 4.

// Constraints:

// 1 <= n <= 300
// 1 <= x <= 5

var numberOfWays = function (n, x) {
  const MOD = 1e9 + 7;

  // Precompute powers of i^x <= n
  const powers = [];
  for (let i = 1; Math.pow(i, x) <= n; i++) {
    powers.push(Math.pow(i, x));
  }

  const memo = new Map();

  function dfs(idx, remaining) {
    if (remaining === 0) return 1; // Found a valid way
    if (idx >= powers.length || remaining < 0) return 0;

    const key = `${idx},${remaining}`;
    if (memo.has(key)) return memo.get(key);

    // Option 1: Include powers[idx]
    const include = dfs(idx + 1, remaining - powers[idx]);
    // Option 2: Skip powers[idx]
    const skip = dfs(idx + 1, remaining);

    const total = (include + skip) % MOD;
    memo.set(key, total);
    return total;
  }

  return dfs(0, n);
};

// Example tests
console.log(numberOfWays(10, 2)); // 1
console.log(numberOfWays(4, 1)); // 2
