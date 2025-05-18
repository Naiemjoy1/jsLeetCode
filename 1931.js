// You are given two integers m and n. Consider an m x n grid where each cell is initially white. You can paint each cell red, green, or blue. All cells must be painted.

// Return the number of ways to color the grid with no two adjacent cells having the same color. Since the answer can be very large, return it modulo 109 + 7.

// Example 1:

// Input: m = 1, n = 1
// Output: 3
// Explanation: The three possible colorings are shown in the image above.
// Example 2:

// Input: m = 1, n = 2
// Output: 6
// Explanation: The six possible colorings are shown in the image above.
// Example 3:

// Input: m = 5, n = 5
// Output: 580986

// Constraints:

// 1 <= m <= 5
// 1 <= n <= 1000

var colorTheGrid = function (m, n) {
  const MOD = 1e9 + 7;
  const colors = [0, 1, 2]; // 0 = Red, 1 = Green, 2 = Blue

  // Generate all valid column patterns (no two adjacent cells have the same color)
  const validPatterns = [];
  const generate = (pattern) => {
    if (pattern.length === m) {
      validPatterns.push([...pattern]);
      return;
    }
    for (let c of colors) {
      if (pattern.length === 0 || pattern[pattern.length - 1] !== c) {
        pattern.push(c);
        generate(pattern);
        pattern.pop();
      }
    }
  };
  generate([]);

  // Encode a pattern as a string key
  const encode = (pattern) => pattern.join("");

  // Precompute compatible pattern pairs
  const isCompatible = (p1, p2) => {
    for (let i = 0; i < m; i++) {
      if (p1[i] === p2[i]) return false;
    }
    return true;
  };

  const patternKeys = validPatterns.map(encode);
  const compatibilityMap = new Map();
  for (let i = 0; i < validPatterns.length; i++) {
    const key1 = patternKeys[i];
    const compatible = [];
    for (let j = 0; j < validPatterns.length; j++) {
      if (isCompatible(validPatterns[i], validPatterns[j])) {
        compatible.push(patternKeys[j]);
      }
    }
    compatibilityMap.set(key1, compatible);
  }

  // Initialize DP map for the first column
  let dp = new Map();
  for (const key of patternKeys) {
    dp.set(key, 1);
  }

  // Process columns from 2 to n
  for (let col = 1; col < n; col++) {
    const newDp = new Map();
    for (const [key, count] of dp.entries()) {
      for (const nextKey of compatibilityMap.get(key)) {
        newDp.set(nextKey, (newDp.get(nextKey) || 0) + count);
        newDp.set(nextKey, newDp.get(nextKey) % MOD);
      }
    }
    dp = newDp;
  }

  // Sum all valid colorings for the last column
  let result = 0;
  for (const val of dp.values()) {
    result = (result + val) % MOD;
  }

  return result;
};
console.log(colorTheGrid(1, 1)); // 3
console.log(colorTheGrid(1, 2)); // 6
console.log(colorTheGrid(5, 5)); // 580986
