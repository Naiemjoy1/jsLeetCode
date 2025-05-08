// There is a dungeon with n x m rooms arranged as a grid.

// You are given a 2D array moveTime of size n x m, where moveTime[i][j] represents the minimum time in seconds when you can start moving to that room. You start from the room (0, 0) at time t = 0 and can move to an adjacent room. Moving between adjacent rooms takes one second for one move and two seconds for the next, alternating between the two.

// Return the minimum time to reach the room (n - 1, m - 1).

// Two rooms are adjacent if they share a common wall, either horizontally or vertically.

// Example 1:

// Input: moveTime = [[0,4],[4,4]]

// Output: 7

// Explanation:

// The minimum time required is 7 seconds.

// At time t == 4, move from room (0, 0) to room (1, 0) in one second.
// At time t == 5, move from room (1, 0) to room (1, 1) in two seconds.
// Example 2:

// Input: moveTime = [[0,0,0,0],[0,0,0,0]]

// Output: 6

// Explanation:

// The minimum time required is 6 seconds.

// At time t == 0, move from room (0, 0) to room (1, 0) in one second.
// At time t == 1, move from room (1, 0) to room (1, 1) in two seconds.
// At time t == 3, move from room (1, 1) to room (1, 2) in one second.
// At time t == 4, move from room (1, 2) to room (1, 3) in two seconds.
// Example 3:

// Input: moveTime = [[0,1],[1,2]]

// Output: 4

// Constraints:

// 2 <= n == moveTime.length <= 750
// 2 <= m == moveTime[i].length <= 750
// 0 <= moveTime[i][j] <= 109

var minTimeToReach = function (moveTime) {
  const n = moveTime.length;
  const m = moveTime[0].length;
  const MOD = 1e9 + 7;

  // 3D visited time: [row][col][step % 2]
  const visited = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => [Infinity, Infinity])
  );

  const directions = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  // Priority queue: [time, row, col, step]
  const pq = [[0, 0, 0, 0]];
  visited[0][0][0] = 0;

  while (pq.length) {
    pq.sort((a, b) => a[0] - b[0]); // Simulate priority queue with sort
    const [time, r, c, step] = pq.shift();

    if (r === n - 1 && c === m - 1) return time;

    const moveCost = step % 2 === 0 ? 1 : 2;
    const nextStep = step + 1;

    for (const [dr, dc] of directions) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < n && nc >= 0 && nc < m) {
        let arrival = time + moveCost;
        if (arrival < moveTime[nr][nc]) {
          arrival = moveTime[nr][nc];
        }

        if (arrival < visited[nr][nc][nextStep % 2]) {
          visited[nr][nc][nextStep % 2] = arrival;
          pq.push([arrival, nr, nc, nextStep]);
        }
      }
    }
  }

  return -1; // unreachable (shouldn't happen with valid input)
};
console.log(
  minTimeToReach([
    [0, 4],
    [4, 4],
  ])
); // Output: 7
console.log(
  minTimeToReach([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ])
); // Output: 6
console.log(
  minTimeToReach([
    [0, 1],
    [1, 2],
  ])
); // Output: 4
