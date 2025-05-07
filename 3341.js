// There is a dungeon with n x m rooms arranged as a grid.

// You are given a 2D array moveTime of size n x m, where moveTime[i][j] represents the minimum time in seconds when you can start moving to that room. You start from the room (0, 0) at time t = 0 and can move to an adjacent room. Moving between adjacent rooms takes exactly one second.

// Return the minimum time to reach the room (n - 1, m - 1).

// Two rooms are adjacent if they share a common wall, either horizontally or vertically.

// Example 1:

// Input: moveTime = [[0,4],[4,4]]

// Output: 6

// Explanation:

// The minimum time required is 6 seconds.

// At time t == 4, move from room (0, 0) to room (1, 0) in one second.
// At time t == 5, move from room (1, 0) to room (1, 1) in one second.
// Example 2:

// Input: moveTime = [[0,0,0],[0,0,0]]

// Output: 3

// Explanation:

// The minimum time required is 3 seconds.

// At time t == 0, move from room (0, 0) to room (1, 0) in one second.
// At time t == 1, move from room (1, 0) to room (1, 1) in one second.
// At time t == 2, move from room (1, 1) to room (1, 2) in one second.
// Example 3:

// Input: moveTime = [[0,1],[1,2]]

// Output: 3

// Constraints:

// 2 <= n == moveTime.length <= 50
// 2 <= m == moveTime[i].length <= 50
// 0 <= moveTime[i][j] <= 109

var minTimeToReach = function (moveTime) {
  const n = moveTime.length;
  const m = moveTime[0].length;
  const dirs = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const minTime = Array.from({ length: n }, () => Array(m).fill(Infinity));
  minTime[0][0] = 0;

  // Priority queue: [time, row, col]
  const pq = [[0, 0, 0]];

  while (pq.length > 0) {
    // Get the node with the smallest time
    pq.sort((a, b) => a[0] - b[0]); // simple priority queue using sort
    const [time, r, c] = pq.shift();

    if (r === n - 1 && c === m - 1) return time;

    for (const [dr, dc] of dirs) {
      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
        let arrivalTime = time + 1;

        // Wait if we arrive before moveTime
        if (arrivalTime < moveTime[nr][nc]) {
          arrivalTime = moveTime[nr][nc];
        }

        // If this path is faster, update and enqueue
        if (arrivalTime < minTime[nr][nc]) {
          minTime[nr][nc] = arrivalTime;
          pq.push([arrivalTime, nr, nc]);
        }
      }
    }
  }

  return -1; // Shouldn't reach here for valid inputs
};
console.log(
  minTimeToReach([
    [0, 4],
    [4, 4],
  ])
); // Output: 6
console.log(
  minTimeToReach([
    [0, 0, 0],
    [0, 0, 0],
  ])
); // Output: 3
console.log(
  minTimeToReach([
    [0, 1],
    [1, 2],
  ])
); // Output: 3
