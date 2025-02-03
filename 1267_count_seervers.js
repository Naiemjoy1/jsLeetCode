// You are given a map of a server center, represented as a m * n integer matrix grid, where 1 means that on that cell there is a server and 0 means that it is no server. Two servers are said to communicate if they are on the same row or on the same column.

// Return the number of servers that communicate with any other server.

 

// Example 1:



// Input: grid = [[1,0],[0,1]]
// Output: 0
// Explanation: No servers can communicate with others.
// Example 2:



// Input: grid = [[1,0],[1,1]]
// Output: 3
// Explanation: All three servers can communicate with at least one other server.
// Example 3:



// Input: grid = [[1,1,0,0],[0,0,1,0],[0,0,1,0],[0,0,0,1]]
// Output: 4
// Explanation: The two servers in the first row can communicate with each other. The two servers in the third column can communicate with each other. The server at right bottom corner can't communicate with any other server.
 

// Constraints:

// m == grid.length
// n == grid[i].length
// 1 <= m <= 250
// 1 <= n <= 250
// grid[i][j] == 0 or 1

var countServers = function(grid) {
    const m = grid.length;
    const n = grid[0].length;

    const rowCount = new Array(m).fill(0); // Count of servers in each row
    const colCount = new Array(n).fill(0); // Count of servers in each column

    // Count the number of servers in each row and column
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1) {
                rowCount[i]++;
                colCount[j]++;
            }
        }
    }

    let result = 0;

    // Count the number of servers that can communicate
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] === 1 && (rowCount[i] > 1 || colCount[j] > 1)) {
                result++;
            }
        }
    }

    return result;
};
const grid1 = [[1, 0], [0, 1]];
console.log(countServers(grid1)); // Output: 0

const grid2 = [[1, 0], [1, 1]];
console.log(countServers(grid2)); // Output: 3

const grid3 = [[1, 1, 0, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
console.log(countServers(grid3)); // Output: 4
