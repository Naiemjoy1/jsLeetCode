// There is a directed graph of n nodes with each node labeled from 0 to n - 1. The graph is represented by a 0-indexed 2D integer array graph where graph[i] is an integer array of nodes adjacent to node i, meaning there is an edge from node i to each node in graph[i].

// A node is a terminal node if there are no outgoing edges. A node is a safe node if every possible path starting from that node leads to a terminal node (or another safe node).

// Return an array containing all the safe nodes of the graph. The answer should be sorted in ascending order.

 

// Example 1:

// Illustration of graph
// Input: graph = [[1,2],[2,3],[5],[0],[5],[],[]]
// Output: [2,4,5,6]
// Explanation: The given graph is shown above.
// Nodes 5 and 6 are terminal nodes as there are no outgoing edges from either of them.
// Every path starting at nodes 2, 4, 5, and 6 all lead to either node 5 or 6.
// Example 2:

// Input: graph = [[1,2,3,4],[1,2],[3,4],[0,4],[]]
// Output: [4]
// Explanation:
// Only node 4 is a terminal node, and every path starting at node 4 leads to node 4.
 

// Constraints:

// n == graph.length
// 1 <= n <= 104
// 0 <= graph[i].length <= n
// 0 <= graph[i][j] <= n - 1
// graph[i] is sorted in a strictly increasing order.
// The graph may contain self-loops.
// The number of edges in the graph will be in the range [1, 4 * 104].

var eventualSafeNodes = function(graph) {
    const n = graph.length;

    // Step 1: Build the reverse graph and calculate in-degrees
    const reverseGraph = Array.from({ length: n }, () => []);
    const inDegree = Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        for (const neighbor of graph[i]) {
            reverseGraph[neighbor].push(i);
            inDegree[i]++;
        }
    }

    // Step 2: Topological sorting using a queue
    const queue = [];
    for (let i = 0; i < n; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }

    const safeNodes = [];

    while (queue.length > 0) {
        const node = queue.shift();
        safeNodes.push(node);

        for (const neighbor of reverseGraph[node]) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    // Step 3: Sort the safe nodes in ascending order and return
    return safeNodes.sort((a, b) => a - b);
};
const graph1 = [[1,2],[2,3],[5],[0],[5],[],[]];
console.log(eventualSafeNodes(graph1)); // Output: [2, 4, 5, 6]

const graph2 = [[1,2,3,4],[1,2],[3,4],[0,4],[]];
console.log(eventualSafeNodes(graph2)); // Output: [4]
