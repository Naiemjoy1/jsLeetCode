// You are given two integers m and n representing a 0-indexed m x n grid. You are also given two 2D integer arrays guards and walls where guards[i] = [rowi, coli] and walls[j] = [rowj, colj] represent the positions of the ith guard and jth wall respectively.

// A guard can see every cell in the four cardinal directions (north, east, south, or west) starting from their position unless obstructed by a wall or another guard. A cell is guarded if there is at least one guard that can see it.

// Return the number of unoccupied cells that are not guarded.

// Example 1:

// Input: m = 4, n = 6, guards = [[0,0],[1,1],[2,3]], walls = [[0,1],[2,2],[1,4]]
// Output: 7
// Explanation: The guarded and unguarded cells are shown in red and green respectively in the above diagram.
// There are a total of 7 unguarded cells, so we return 7.
// Example 2:

// Input: m = 3, n = 3, guards = [[1,1]], walls = [[0,1],[1,0],[2,1],[1,2]]
// Output: 4
// Explanation: The unguarded cells are shown in green in the above diagram.
// There are a total of 4 unguarded cells, so we return 4.

// Constraints:

// 1 <= m, n <= 105
// 2 <= m * n <= 105
// 1 <= guards.length, walls.length <= 5 * 104
// 2 <= guards.length + walls.length <= m * n
// guards[i].length == walls[j].length == 2
// 0 <= rowi, rowj < m
// 0 <= coli, colj < n
// All the positions in guards and walls are unique.

var countUnguarded = function (m, n, guards, walls) {
  // Initialize the grid
  const grid = Array.from({ length: m }, () => Array(n).fill(0));

  // Constants for the grid
  const WALL = -1,
    GUARD = -2,
    GUARDED = 1;

  // Mark walls and guards
  for (const [row, col] of walls) {
    grid[row][col] = WALL;
  }
  for (const [row, col] of guards) {
    grid[row][col] = GUARD;
  }

  // Helper to mark cells in one direction
  const markDirection = (row, col, dRow, dCol) => {
    let r = row + dRow,
      c = col + dCol;
    while (r >= 0 && r < m && c >= 0 && c < n) {
      if (grid[r][c] === WALL || grid[r][c] === GUARD) break;
      if (grid[r][c] === 0) grid[r][c] = GUARDED;
      r += dRow;
      c += dCol;
    }
  };

  // Simulate guard vision
  for (const [row, col] of guards) {
    markDirection(row, col, -1, 0); // Up
    markDirection(row, col, 1, 0); // Down
    markDirection(row, col, 0, -1); // Left
    markDirection(row, col, 0, 1); // Right
  }

  // Count unguarded cells
  let unguardedCount = 0;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === 0) unguardedCount++;
    }
  }

  return unguardedCount;
};

// Example usage:
console.log(
  countUnguarded(
    4,
    6,
    [
      [0, 0],
      [1, 1],
      [2, 3],
    ],
    [
      [0, 1],
      [2, 2],
      [1, 4],
    ]
  )
); // Output: 7
console.log(
  countUnguarded(
    3,
    3,
    [[1, 1]],
    [
      [0, 1],
      [1, 0],
      [2, 1],
      [1, 2],
    ]
  )
); // Output: 4
