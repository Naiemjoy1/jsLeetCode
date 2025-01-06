// You have two types of tiles: a 2 x 1 domino shape and a tromino shape. You may rotate these shapes.


// Given an integer n, return the number of ways to tile an 2 x n board. Since the answer may be very large, return it modulo 109 + 7.

// In a tiling, every square must be covered by a tile. Two tilings are different if and only if there are two 4-directionally adjacent cells on the board such that exactly one of the tilings has both squares occupied by a tile.

 

// Example 1:


// Input: n = 3
// Output: 5
// Explanation: The five different ways are show above.
// Example 2:

// Input: n = 1
// Output: 1
 

// Constraints:

// 1 <= n <= 1000

var numTilings = function(n) {
    const MOD = 1e9 + 7;
    
    if (n === 1) return 1;
    if (n === 2) return 2;
    if (n === 3) return 5;

    let dp = new Array(n + 1).fill(0);
    dp[0] = 1;  // Base case: 1 way to tile an empty grid
    dp[1] = 1;  // Base case: 1 way to tile a 2x1 grid
    dp[2] = 2;  // Base case: 2 ways to tile a 2x2 grid
    dp[3] = 5;  // Base case: 5 ways to tile a 2x3 grid
    
    for (let i = 4; i <= n; i++) {
        dp[i] = (dp[i-1] + dp[i-2] + 2 * dp[i-3]) % MOD;
    }
    
    return dp[n];
};
