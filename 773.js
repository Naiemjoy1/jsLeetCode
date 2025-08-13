// On an 2 x 3 board, there are five tiles labeled from 1 to 5, and an empty square represented by 0. A move consists of choosing 0 and a 4-directionally adjacent number and swapping it.

// The state of the board is solved if and only if the board is [[1,2,3],[4,5,0]].

// Given the puzzle board board, return the least number of moves required so that the state of the board is solved. If it is impossible for the state of the board to be solved, return -1.

// Example 1:

// Input: board = [[1,2,3],[4,0,5]]
// Output: 1
// Explanation: Swap the 0 and the 5 in one move.
// Example 2:

// Input: board = [[1,2,3],[5,4,0]]
// Output: -1
// Explanation: No number of moves will make the board solved.
// Example 3:

// Input: board = [[4,1,2],[5,0,3]]
// Output: 5
// Explanation: 5 is the smallest number of moves that solves the board.
// An example path:
// After move 0: [[4,1,2],[5,0,3]]
// After move 1: [[4,1,2],[0,5,3]]
// After move 2: [[0,1,2],[4,5,3]]
// After move 3: [[1,0,2],[4,5,3]]
// After move 4: [[1,2,0],[4,5,3]]
// After move 5: [[1,2,3],[4,5,0]]

// Constraints:

// board.length == 2
// board[i].length == 3
// 0 <= board[i][j] <= 5
// Each value board[i][j] is unique.

var slidingPuzzle = function (board) {
  const target = "123450";
  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  const rows = 2;
  const cols = 3;

  const boardToString = (board) => board.flat().join("");

  const swap = (str, i, j) => {
    const arr = str.split("");
    [arr[i], arr[j]] = [arr[j], arr[i]];
    return arr.join("");
  };

  const initialState = boardToString(board);
  const queue = [[initialState, initialState.indexOf("0"), 0]];
  const visited = new Set();
  visited.add(initialState);

  while (queue.length > 0) {
    const [current, zeroIdx, moves] = queue.shift();

    if (current === target) return moves;

    const zeroRow = Math.floor(zeroIdx / cols);
    const zeroCol = zeroIdx % cols;

    for (const [dr, dc] of directions) {
      const newRow = zeroRow + dr;
      const newCol = zeroCol + dc;

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        const newZeroIdx = newRow * cols + newCol;
        const nextState = swap(current, zeroIdx, newZeroIdx);

        if (!visited.has(nextState)) {
          visited.add(nextState);
          queue.push([nextState, newZeroIdx, moves + 1]);
        }
      }
    }
  }

  return -1;
};

console.log(
  slidingPuzzle([
    [1, 2, 3],
    [4, 0, 5],
  ])
);
console.log(
  slidingPuzzle([
    [1, 2, 3],
    [5, 4, 0],
  ])
);
console.log(
  slidingPuzzle([
    [4, 1, 2],
    [5, 0, 3],
  ])
);
