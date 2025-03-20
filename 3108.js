// There is an undirected weighted graph with n vertices labeled from 0 to n - 1.

// You are given the integer n and an array edges, where edges[i] = [ui, vi, wi] indicates that there is an edge between vertices ui and vi with a weight of wi.

// A walk on a graph is a sequence of vertices and edges. The walk starts and ends with a vertex, and each edge connects the vertex that comes before it and the vertex that comes after it. It's important to note that a walk may visit the same edge or vertex more than once.

// The cost of a walk starting at node u and ending at node v is defined as the bitwise AND of the weights of the edges traversed during the walk. In other words, if the sequence of edge weights encountered during the walk is w0, w1, w2, ..., wk, then the cost is calculated as w0 & w1 & w2 & ... & wk, where & denotes the bitwise AND operator.

// You are also given a 2D array query, where query[i] = [si, ti]. For each query, you need to find the minimum cost of the walk starting at vertex si and ending at vertex ti. If there exists no such walk, the answer is -1.

// Return the array answer, where answer[i] denotes the minimum cost of a walk for query i.

// Example 1:

// Input: n = 5, edges = [[0,1,7],[1,3,7],[1,2,1]], query = [[0,3],[3,4]]

// Output: [1,-1]

// Explanation:

// To achieve the cost of 1 in the first query, we need to move on the following edges: 0->1 (weight 7), 1->2 (weight 1), 2->1 (weight 1), 1->3 (weight 7).

// In the second query, there is no walk between nodes 3 and 4, so the answer is -1.

// Example 2:

// Input: n = 3, edges = [[0,2,7],[0,1,15],[1,2,6],[1,2,1]], query = [[1,2]]

// Output: [0]

// Explanation:

// To achieve the cost of 0 in the first query, we need to move on the following edges: 1->2 (weight 1), 2->1 (weight 6), 1->2 (weight 1).

// Constraints:

// 2 <= n <= 105
// 0 <= edges.length <= 105
// edges[i].length == 3
// 0 <= ui, vi <= n - 1
// ui != vi
// 0 <= wi <= 105
// 1 <= query.length <= 105
// query[i].length == 2
// 0 <= si, ti <= n - 1
// si != ti

var minimumCost = function (n, edges, query) {
  // Step 1: Build graph
  const graph = new Map();
  for (const [u, v, w] of edges) {
    if (!graph.has(u)) graph.set(u, []);
    if (!graph.has(v)) graph.set(v, []);
    graph.get(u).push([v, w]);
    graph.get(v).push([u, w]);
  }

  // Step 2: Union-Find (Disjoint Set) to track connected components
  const parent = Array(n)
    .fill(0)
    .map((_, i) => i);

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x]); // Path compression
    return parent[x];
  }

  function union(x, y) {
    const rootX = find(x);
    const rootY = find(y);
    if (rootX !== rootY) {
      parent[rootY] = rootX; // Merge components
    }
  }

  // Step 3: Connect nodes using Union-Find
  for (const [u, v, w] of edges) {
    union(u, v);
  }

  // Step 4: Precompute min AND cost using BFS for each component
  const minAndCost = new Map();

  function bfs(start) {
    const component = find(start);
    if (minAndCost.has(component)) return; // Already computed

    const costMap = new Map();
    const queue = [[start, ~0]]; // (~0 means all bits set to 1)
    const visited = new Set([start]);

    while (queue.length) {
      const [node, andCost] = queue.shift();
      costMap.set(node, andCost);
      for (const [neighbor, weight] of graph.get(node) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([neighbor, andCost & weight]); // Update AND cost
        }
      }
    }

    minAndCost.set(component, costMap);
  }

  for (let i = 0; i < n; i++) {
    if (graph.has(i)) bfs(i);
  }

  // Step 5: Answer Queries
  const result = [];
  for (const [s, t] of query) {
    if (find(s) !== find(t)) {
      result.push(-1);
    } else {
      result.push(minAndCost.get(find(s)).get(t));
    }
  }

  return result;
};
