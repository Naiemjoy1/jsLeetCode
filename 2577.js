// You are given a m x n matrix grid consisting of non-negative integers where grid[row][col] represents the minimum time required to be able to visit the cell (row, col), which means you can visit the cell (row, col) only when the time you visit it is greater than or equal to grid[row][col].

// You are standing in the top-left cell of the matrix in the 0th second, and you must move to any adjacent cell in the four directions: up, down, left, and right. Each move you make takes 1 second.

// Return the minimum time required in which you can visit the bottom-right cell of the matrix. If you cannot visit the bottom-right cell, then return -1.

// Example 1:

// Input: grid = [[0,1,3,2],[5,1,2,5],[4,3,8,6]]
// Output: 7
// Explanation: One of the paths that we can take is the following:
// - at t = 0, we are on the cell (0,0).
// - at t = 1, we move to the cell (0,1). It is possible because grid[0][1] <= 1.
// - at t = 2, we move to the cell (1,1). It is possible because grid[1][1] <= 2.
// - at t = 3, we move to the cell (1,2). It is possible because grid[1][2] <= 3.
// - at t = 4, we move to the cell (1,1). It is possible because grid[1][1] <= 4.
// - at t = 5, we move to the cell (1,2). It is possible because grid[1][2] <= 5.
// - at t = 6, we move to the cell (1,3). It is possible because grid[1][3] <= 6.
// - at t = 7, we move to the cell (2,3). It is possible because grid[2][3] <= 7.
// The final time is 7. It can be shown that it is the minimum time possible.
// Example 2:

// Input: grid = [[0,2,4],[3,2,1],[1,0,4]]
// Output: -1
// Explanation: There is no path from the top left to the bottom-right cell.

// Constraints:

// m == grid.length
// n == grid[i].length
// 2 <= m, n <= 1000
// 4 <= m * n <= 105
// 0 <= grid[i][j] <= 105
// grid[0][0] == 0

var minimumTime = function (grid) {
  const m = grid.length,
    n = grid[0].length;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  class MinHeap {
    constructor() {
      this.heap = [];
    }
    push(node) {
      this.heap.push(node);
      this._heapifyUp();
    }
    pop() {
      if (this.size() === 1) return this.heap.pop();
      const top = this.heap[0];
      this.heap[0] = this.heap.pop();
      this._heapifyDown();
      return top;
    }
    size() {
      return this.heap.length;
    }
    _heapifyUp() {
      let idx = this.heap.length - 1;
      while (idx > 0) {
        let parentIdx = Math.floor((idx - 1) / 2);
        if (this.heap[parentIdx][0] <= this.heap[idx][0]) break;
        [this.heap[parentIdx], this.heap[idx]] = [
          this.heap[idx],
          this.heap[parentIdx],
        ];
        idx = parentIdx;
      }
    }
    _heapifyDown() {
      let idx = 0;
      const length = this.heap.length;
      while (true) {
        let leftIdx = 2 * idx + 1;
        let rightIdx = 2 * idx + 2;
        let smallest = idx;
        if (
          leftIdx < length &&
          this.heap[leftIdx][0] < this.heap[smallest][0]
        ) {
          smallest = leftIdx;
        }
        if (
          rightIdx < length &&
          this.heap[rightIdx][0] < this.heap[smallest][0]
        ) {
          smallest = rightIdx;
        }
        if (smallest === idx) break;
        [this.heap[smallest], this.heap[idx]] = [
          this.heap[idx],
          this.heap[smallest],
        ];
        idx = smallest;
      }
    }
  }

  if (grid[0][1] > 1 && grid[1][0] > 1) return -1;

  const pq = new MinHeap();
  pq.push([0, 0, 0]);
  const visited = Array.from({ length: m }, () => Array(n).fill(false));

  while (pq.size() > 0) {
    const [time, row, col] = pq.pop();
    if (row === m - 1 && col === n - 1) return time;
    if (visited[row][col]) continue;
    visited[row][col] = true;

    for (const [dr, dc] of directions) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr >= 0 && nr < m && nc >= 0 && nc < n && !visited[nr][nc]) {
        let waitTime = Math.max(0, grid[nr][nc] - time - 1);
        if (waitTime % 2 !== 0) waitTime += 1;
        const nextTime = time + 1 + waitTime;
        pq.push([nextTime, nr, nc]);
      }
    }
  }
  return -1;
};

console.log(
  minimumTime([
    [0, 1, 3, 2],
    [5, 1, 2, 5],
    [4, 3, 8, 6],
  ])
);
console.log(
  minimumTime([
    [0, 2, 4],
    [3, 2, 1],
    [1, 0, 4],
  ])
);
