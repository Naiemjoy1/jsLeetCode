// You are given three integers n, m, k. A good array arr of size n is defined as follows:

// Each element in arr is in the inclusive range [1, m].
// Exactly k indices i (where 1 <= i < n) satisfy the condition arr[i - 1] == arr[i].
// Return the number of good arrays that can be formed.

// Since the answer may be very large, return it modulo 109 + 7.

// Example 1:

// Input: n = 3, m = 2, k = 1

// Output: 4

// Explanation:

// There are 4 good arrays. They are [1, 1, 2], [1, 2, 2], [2, 1, 1] and [2, 2, 1].
// Hence, the answer is 4.
// Example 2:

// Input: n = 4, m = 2, k = 2

// Output: 6

// Explanation:

// The good arrays are [1, 1, 1, 2], [1, 1, 2, 2], [1, 2, 2, 2], [2, 1, 1, 1], [2, 2, 1, 1] and [2, 2, 2, 1].
// Hence, the answer is 6.
// Example 3:

// Input: n = 5, m = 2, k = 0

// Output: 2

// Explanation:

// The good arrays are [1, 2, 1, 2, 1] and [2, 1, 2, 1, 2]. Hence, the answer is 2.

// Constraints:

// 1 <= n <= 105
// 1 <= m <= 105
// 0 <= k <= n - 1

const MOD = 1e9 + 7;

var countGoodArrays = function (n, m, k) {
  let prev = new Array(k + 1).fill(0);
  let curr = new Array(k + 1).fill(0);

  prev[0] = m;

  for (let i = 2; i <= n; i++) {
    for (let j = 0; j <= k; j++) {
      curr[j] = 0;

      // Case 1: Previous count stays the same, add different number => m - 1 choices
      curr[j] = (prev[j] * (m - 1)) % MOD;

      // Case 2: Previous count increases, repeat previous number => 1 choice
      if (j > 0) {
        curr[j] = (curr[j] + prev[j - 1]) % MOD;
      }
    }

    // Swap references
    [prev, curr] = [curr, prev];
  }

  return prev[k];
};
console.log(countGoodArrays(3, 2, 1)); // Output: 4
console.log(countGoodArrays(4, 2, 2)); // Output: 6
console.log(countGoodArrays(5, 2, 0)); // Output: 2
