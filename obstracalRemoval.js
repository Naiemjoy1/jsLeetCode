// You are given a 0-indexed 2D integer array grid of size m x n. Each cell has one of two values:

// 0 represents an empty cell,
// 1 represents an obstacle that may be removed.
// You can move up, down, left, or right from and to an empty cell.

// Return the minimum number of obstacles to remove so you can move from the upper left corner (0, 0) to the lower right corner (m - 1, n - 1).

// Example 1:

// Input: grid = [[0,1,1],[1,1,0],[1,1,0]]
// Output: 2
// Explanation: We can remove the obstacles at (0, 1) and (0, 2) to create a path from (0, 0) to (2, 2).
// It can be shown that we need to remove at least 2 obstacles, so we return 2.
// Note that there may be other ways to remove 2 obstacles to create a path.
// Example 2:

// Input: grid = [[0,1,0,0,0],[0,1,0,1,0],[0,0,0,1,0]]
// Output: 0
// Explanation: We can move from (0, 0) to (2, 4) without removing any obstacles, so we return 0.

// Constraints:

// m == grid.length
// n == grid[i].length
// 1 <= m, n <= 105
// 2 <= m * n <= 105
// grid[i][j] is either 0 or 1.
// grid[0][0] == grid[m - 1][n - 1] == 0

var minimumObstacles = function (grid) {
  const m = grid.length,
    n = grid[0].length;
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  // Deque for BFS with weights
  const deque = [];
  deque.push([0, 0, 0]); // [row, col, cost]

  // Visited array
  const visited = Array.from({ length: m }, () => Array(n).fill(false));
  visited[0][0] = true;

  while (deque.length > 0) {
    const [x, y, cost] = deque.shift();

    // If we reached the bottom-right corner, return the cost
    if (x === m - 1 && y === n - 1) return cost;

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;

      // Check bounds and if already visited
      if (nx >= 0 && nx < m && ny >= 0 && ny < n && !visited[nx][ny]) {
        visited[nx][ny] = true;

        if (grid[nx][ny] === 0) {
          // No obstacle, prioritize this cell by adding to the front
          deque.unshift([nx, ny, cost]);
        } else {
          // Obstacle, add to the back with incremented cost
          deque.push([nx, ny, cost + 1]);
        }
      }
    }
  }

  return -1; // In case there's no valid path (though constraints guarantee one exists)
};
console.log(
  minimumObstacles([
    [0, 1, 1],
    [1, 1, 0],
    [1, 1, 0],
  ])
); // Output: 2
console.log(
  minimumObstacles([
    [0, 1, 0, 0, 0],
    [0, 1, 0, 1, 0],
    [0, 0, 0, 1, 0],
  ])
); // Output: 0
