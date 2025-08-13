// You are given an m x n grid where each cell can have one of three values:

// 0 representing an empty cell,
// 1 representing a fresh orange, or
// 2 representing a rotten orange.
// Every minute, any fresh orange that is 4-directionally adjacent to a rotten orange becomes rotten.

// Return the minimum number of minutes that must elapse until no cell has a fresh orange. If this is impossible, return -1.

 

// Example 1:


// Input: grid = [[2,1,1],[1,1,0],[0,1,1]]
// Output: 4
// Example 2:

// Input: grid = [[2,1,1],[0,1,1],[1,0,1]]
// Output: -1
// Explanation: The orange in the bottom left corner (row 2, column 0) is never rotten, because rotting only happens 4-directionally.
// Example 3:

// Input: grid = [[0,2]]
// Output: 0
// Explanation: Since there are already no fresh oranges at minute 0, the answer is just 0.
 

// Constraints:

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 10
// grid[i][j] is 0, 1, or 2.

var orangesRotting = function(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    const queue = [];
    let freshCount = 0;

    // Directions for 4-directional movement (up, down, left, right)
    const directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0]
    ];

    // Initialize the queue with all initially rotten oranges and count fresh oranges
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 2) {
                queue.push([r, c, 0]); // [row, col, time]
            } else if (grid[r][c] === 1) {
                freshCount++;
            }
        }
    }

    // If there are no fresh oranges, return 0 immediately
    if (freshCount === 0) return 0;

    let timeElapsed = 0;

    // BFS to spread the rotting process
    while (queue.length > 0) {
        const [row, col, time] = queue.shift();
        timeElapsed = time;

        for (const [dr, dc] of directions) {
            const newRow = row + dr;
            const newCol = col + dc;

            // Check if the new cell is valid and contains a fresh orange
            if (
                newRow >= 0 && newRow < rows &&
                newCol >= 0 && newCol < cols &&
                grid[newRow][newCol] === 1
            ) {
                grid[newRow][newCol] = 2; // Mark it as rotten
                freshCount--; // Decrease the count of fresh oranges
                queue.push([newRow, newCol, time + 1]); // Add to queue with updated time
            }
        }
    }

    // If there are still fresh oranges left, return -1
    return freshCount === 0 ? timeElapsed : -1;
};
console.log(orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // Output: 4
console.log(orangesRotting([[2,1,1],[0,1,1],[1,0,1]])); // Output: -1
console.log(orangesRotting([[0,2]])); // Output: 0
