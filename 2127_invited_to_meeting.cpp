// A company is organizing a meeting and has a list of n employees, waiting to be invited. They have arranged for a large circular table, capable of seating any number of employees.

// The employees are numbered from 0 to n - 1. Each employee has a favorite person and they will attend the meeting only if they can sit next to their favorite person at the table. The favorite person of an employee is not themself.

// Given a 0-indexed integer array favorite, where favorite[i] denotes the favorite person of the ith employee, return the maximum number of employees that can be invited to the meeting.

 

// Example 1:


// Input: favorite = [2,2,1,2]
// Output: 3
// Explanation:
// The above figure shows how the company can invite employees 0, 1, and 2, and seat them at the round table.
// All employees cannot be invited because employee 2 cannot sit beside employees 0, 1, and 3, simultaneously.
// Note that the company can also invite employees 1, 2, and 3, and give them their desired seats.
// The maximum number of employees that can be invited to the meeting is 3. 
// Example 2:

// Input: favorite = [1,2,0]
// Output: 3
// Explanation: 
// Each employee is the favorite person of at least one other employee, and the only way the company can invite them is if they invite every employee.
// The seating arrangement will be the same as that in the figure given in example 1:
// - Employee 0 will sit between employees 2 and 1.
// - Employee 1 will sit between employees 0 and 2.
// - Employee 2 will sit between employees 1 and 0.
// The maximum number of employees that can be invited to the meeting is 3.
// Example 3:


// Input: favorite = [3,0,1,4,1]
// Output: 4
// Explanation:
// The above figure shows how the company will invite employees 0, 1, 3, and 4, and seat them at the round table.
// Employee 2 cannot be invited because the two spots next to their favorite employee 1 are taken.
// So the company leaves them out of the meeting.
// The maximum number of employees that can be invited to the meeting is 4.
 

// Constraints:

// n == favorite.length
// 2 <= n <= 105
// 0 <= favorite[i] <= n - 1
// favorite[i] != i

enum class State { kInit, kVisiting, kVisited };

class Solution {
 public:
  int maximumInvitations(vector<int>& favorite) {
    const int n = favorite.size();
    int sumComponentsLength = 0;  // the component: a -> b -> c <-> x <- y
    vector<vector<int>> graph(n);
    vector<int> inDegrees(n);
    vector<int> maxChainLength(n, 1);
    queue<int> q;

    // Build the graph.
    for (int i = 0; i < n; ++i) {
      graph[i].push_back(favorite[i]);
      ++inDegrees[favorite[i]];
    }

    // Perform topological sorting.
    for (int i = 0; i < n; ++i)
      if (inDegrees[i] == 0)
        q.push(i);

    while (!q.empty()) {
      const int u = q.front();
      q.pop();
      for (const int v : graph[u]) {
        if (--inDegrees[v] == 0)
          q.push(v);
        maxChainLength[v] = max(maxChainLength[v], 1 + maxChainLength[u]);
      }
    }

    for (int i = 0; i < n; ++i)
      if (favorite[favorite[i]] == i)
        // i <-> favorite[i] (the cycle's length = 2)
        sumComponentsLength += maxChainLength[i] + maxChainLength[favorite[i]];

    int maxCycleLength = 0;  // the cycle : a -> b -> c -> a
    vector<int> parent(n, -1);
    vector<bool> seen(n);
    vector<State> states(n);

    for (int i = 0; i < n; ++i)
      if (!seen[i])
        findCycle(graph, i, parent, seen, states, maxCycleLength);

    return max(sumComponentsLength / 2, maxCycleLength);
  }

 private:
  void findCycle(const vector<vector<int>>& graph, int u, vector<int>& parent,
                 vector<bool>& seen, vector<State>& states,
                 int& maxCycleLength) {
    seen[u] = true;
    states[u] = State::kVisiting;

    for (const int v : graph[u]) {
      if (!seen[v]) {
        parent[v] = u;
        findCycle(graph, v, parent, seen, states, maxCycleLength);
      } else if (states[v] == State::kVisiting) {
        // Find the cycle's length.
        int curr = u;
        int cycleLength = 1;
        while (curr != v) {
          curr = parent[curr];
          ++cycleLength;
        }
        maxCycleLength = max(maxCycleLength, cycleLength);
      }
    }

    states[u] = State::kVisited;
  }
};