// You are given an m x n integer matrix grid and an array queries of size k.

// Find an array answer of size k such that for each integer queries[i] you start in the top left cell of the matrix and repeat the following process:

// If queries[i] is strictly greater than the value of the current cell that you are in, then you get one point if it is your first time visiting this cell, and you can move to any adjacent cell in all 4 directions: up, down, left, and right.
// Otherwise, you do not get any points, and you end this process.
// After the process, answer[i] is the maximum number of points you can get. Note that for each query you are allowed to visit the same cell multiple times.

// Return the resulting array answer.

// Example 1:

// Input: grid = [[1,2,3],[2,5,7],[3,5,1]], queries = [5,6,2]
// Output: [5,8,1]
// Explanation: The diagrams above show which cells we visit to get points for each query.
// Example 2:

// Input: grid = [[5,2,1],[1,1,2]], queries = [3]
// Output: [0]
// Explanation: We can not get any points because the value of the top left cell is already greater than or equal to 3.

// Constraints:

// m == grid.length
// n == grid[i].length
// 2 <= m, n <= 1000
// 4 <= m * n <= 105
// k == queries.length
// 1 <= k <= 104
// 1 <= grid[i][j], queries[i] <= 106

var maxPoints = function (grid, queries) {
  const m = grid.length,
    n = grid[0].length;

  // Directions to move in the grid (right, down, left, up)
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  // Helper function to perform BFS
  const bfs = (grid, query) => {
    let visited = Array.from({ length: m }, () => Array(n).fill(false));
    let queue = [[0, 0]]; // Start from the top-left corner
    let points = 0;

    // If the starting point is greater than or equal to the query, return 0 points
    if (grid[0][0] >= query) return 0;

    // Mark the starting point as visited
    visited[0][0] = true;
    points++;

    while (queue.length > 0) {
      let [x, y] = queue.shift();

      // Explore the four possible directions
      for (let [dx, dy] of directions) {
        let nx = x + dx,
          ny = y + dy;

        // Check if the new position is within bounds and not visited
        if (
          nx >= 0 &&
          ny >= 0 &&
          nx < m &&
          ny < n &&
          !visited[nx][ny] &&
          grid[nx][ny] > query
        ) {
          visited[nx][ny] = true;
          queue.push([nx, ny]);
          points++;
        }
      }
    }
    return points;
  };

  // For each query, perform BFS to find the maximum points
  let results = [];
  for (let query of queries) {
    results.push(bfs(grid, query));
  }

  return results;
};
