// There are n cities numbered from 0 to n - 1 and n - 1 roads such that there is only one way to travel between two different cities (this network form a tree). Last year, The ministry of transport decided to orient the roads in one direction because they are too narrow.

// Roads are represented by connections where connections[i] = [ai, bi] represents a road from city ai to city bi.

// This year, there will be a big event in the capital (city 0), and many people want to travel to this city.

// Your task consists of reorienting some roads such that each city can visit the city 0. Return the minimum number of edges changed.

// It's guaranteed that each city can reach city 0 after reorder.

 

// Example 1:


// Input: n = 6, connections = [[0,1],[1,3],[2,3],[4,0],[4,5]]
// Output: 3
// Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
// Example 2:


// Input: n = 5, connections = [[1,0],[1,2],[3,2],[3,4]]
// Output: 2
// Explanation: Change the direction of edges show in red such that each node can reach the node 0 (capital).
// Example 3:

// Input: n = 3, connections = [[1,0],[2,0]]
// Output: 0
 

// Constraints:

// 2 <= n <= 5 * 104
// connections.length == n - 1
// connections[i].length == 2
// 0 <= ai, bi <= n - 1
// ai != bi

var minReorder = function(n, connections) {
    const graph = new Map();

    // Build adjacency list with direction
    for (const [a, b] of connections) {
        if (!graph.has(a)) graph.set(a, []);
        if (!graph.has(b)) graph.set(b, []);
        graph.get(a).push([b, 1]); // Edge going from a to b
        graph.get(b).push([a, 0]); // Edge going from b to a
    }

    let reorientCount = 0;
    const visited = new Set();

    const dfs = (node) => {
        visited.add(node);

        for (const [neighbor, direction] of graph.get(node)) {
            if (!visited.has(neighbor)) {
                reorientCount += direction; // Count if the edge needs reorientation
                dfs(neighbor);
            }
        }
    };

    dfs(0); // Start DFS from city 0

    return reorientCount;
};
console.log(minReorder(6, [[0,1],[1,3],[2,3],[4,0],[4,5]])); // Output: 3
console.log(minReorder(5, [[1,0],[1,2],[3,2],[3,4]])); // Output: 2
console.log(minReorder(3, [[1,0],[2,0]])); // Output: 0
