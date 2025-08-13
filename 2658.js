// You are given a 0-indexed 2D matrix grid of size m x n, where (r, c) represents:

// A land cell if grid[r][c] = 0, or
// A water cell containing grid[r][c] fish, if grid[r][c] > 0.
// A fisher can start at any water cell (r, c) and can do the following operations any number of times:

// Catch all the fish at cell (r, c), or
// Move to any adjacent water cell.
// Return the maximum number of fish the fisher can catch if he chooses his starting cell optimally, or 0 if no water cell exists.

// An adjacent cell of the cell (r, c), is one of the cells (r, c + 1), (r, c - 1), (r + 1, c) or (r - 1, c) if it exists.

 

// Example 1:


// Input: grid = [[0,2,1,0],[4,0,0,3],[1,0,0,4],[0,3,2,0]]
// Output: 7
// Explanation: The fisher can start at cell (1,3) and collect 3 fish, then move to cell (2,3) and collect 4 fish.
// Example 2:


// Input: grid = [[1,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]]
// Output: 1
// Explanation: The fisher can start at cells (0,0) or (3,3) and collect a single fish. 
 

// Constraints:

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 10
// 0 <= grid[i][j] <= 10

var findMaxFish = function(grid) {
    const m = grid.length;
    const n = grid[0].length;
    let maxFish = 0;

    const directions = [
        [0, 1],  // right
        [0, -1], // left
        [1, 0],  // down
        [-1, 0]  // up
    ];

    const dfs = (r, c) => {
        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] === 0) {
            return 0;
        }
        let fish = grid[r][c];
        grid[r][c] = 0; // Mark the cell as visited
        for (const [dr, dc] of directions) {
            fish += dfs(r + dr, c + dc);
        }
        return fish;
    };

    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            if (grid[r][c] > 0) {
                maxFish = Math.max(maxFish, dfs(r, c));
            }
        }
    }

    return maxFish;
};

// Example usage:
const grid1 = [[0, 2, 1, 0], [4, 0, 0, 3], [1, 0, 0, 4], [0, 3, 2, 0]];
console.log(findMaxFish(grid1)); // Output: 7

const grid2 = [[1, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 1]];
console.log(findMaxFish(grid2)); // Output: 1
