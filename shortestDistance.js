// You are given an integer n and a 2D integer array queries.

// There are n cities numbered from 0 to n - 1. Initially, there is a unidirectional road from city i to city i + 1 for all 0 <= i < n - 1.

// queries[i] = [ui, vi] represents the addition of a new unidirectional road from city ui to city vi. After each query, you need to find the length of the shortest path from city 0 to city n - 1.

// Return an array answer where for each i in the range [0, queries.length - 1], answer[i] is the length of the shortest path from city 0 to city n - 1 after processing the first i + 1 queries.

// Example 1:

// Input: n = 5, queries = [[2,4],[0,2],[0,4]]

// Output: [3,2,1]

// Explanation:

// After the addition of the road from 2 to 4, the length of the shortest path from 0 to 4 is 3.

// After the addition of the road from 0 to 2, the length of the shortest path from 0 to 4 is 2.

// After the addition of the road from 0 to 4, the length of the shortest path from 0 to 4 is 1.

// Example 2:

// Input: n = 4, queries = [[0,3],[0,2]]

// Output: [1,1]

// Explanation:

// After the addition of the road from 0 to 3, the length of the shortest path from 0 to 3 is 1.

// After the addition of the road from 0 to 2, the length of the shortest path remains 1.

// Constraints:

// 3 <= n <= 500
// 1 <= queries.length <= 500
// queries[i].length == 2
// 0 <= queries[i][0] < queries[i][1] < n
// 1 < queries[i][1] - queries[i][0]
// There are no repeated roads among the queries.

var shortestDistanceAfterQueries = function (n, queries) {
  // Step 1: Initialize the graph with initial roads
  const graph = Array.from({ length: n }, () => []);
  for (let i = 0; i < n - 1; i++) {
    graph[i].push([i + 1, 1]); // Road from i to i+1 with weight 1
  }

  const dijkstra = (start, end) => {
    const distances = Array(n).fill(Infinity);
    distances[start] = 0;
    const minHeap = [[start, 0]]; // [node, distance]

    while (minHeap.length > 0) {
      const [node, dist] = minHeap.shift();

      if (dist > distances[node]) continue;

      for (const [neighbor, weight] of graph[node]) {
        const newDist = dist + weight;
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          minHeap.push([neighbor, newDist]);
        }
      }
      // Sort the heap by distance (Greedy choice)
      minHeap.sort((a, b) => a[1] - b[1]);
    }

    return distances[end];
  };

  // Step 2: Process each query
  const result = [];
  for (const [u, v] of queries) {
    graph[u].push([v, 1]); // Add the new road
    const shortestPath = dijkstra(0, n - 1); // Find shortest path
    result.push(shortestPath);
  }

  return result;
};
