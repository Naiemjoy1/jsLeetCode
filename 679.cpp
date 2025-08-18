// You are given an integer array cards of length 4. You have four cards, each containing a number in the range [1, 9]. You should arrange the numbers on these cards in a mathematical expression using the operators ['+', '-', '*', '/'] and the parentheses '(' and ')' to get the value 24.

// You are restricted with the following rules:

// The division operator '/' represents real division, not integer division.
// For example, 4 / (1 - 2 / 3) = 4 / (1 / 3) = 12.
// Every operation done is between two numbers. In particular, we cannot use '-' as a unary operator.
// For example, if cards = [1, 1, 1, 1], the expression "-1 - 1 - 1 - 1" is not allowed.
// You cannot concatenate numbers together
// For example, if cards = [1, 2, 1, 2], the expression "12 + 12" is not valid.
// Return true if you can get such expression that evaluates to 24, and false otherwise.

 

// Example 1:

// Input: cards = [4,1,8,7]
// Output: true
// Explanation: (8-4) * (7-1) = 24
// Example 2:

// Input: cards = [1,2,1,2]
// Output: false
 

// Constraints:

// cards.length == 4
// 1 <= cards[i] <= 9

#include <bits/stdc++.h>
using namespace std;

class Solution {
 public:
  bool judgePoint24(vector<int>& nums) {
    vector<double> doubleNums;
    for (int num : nums) {
      doubleNums.push_back(num);
    }
    return dfs(doubleNums);
  }

 private:
  const double EPS = 1e-6;  // tolerance for floating-point comparison

  bool dfs(vector<double>& nums) {
    if (nums.size() == 1) {
      return fabs(nums[0] - 24.0) < EPS;
    }

    // Try every pair (i, j)
    for (int i = 0; i < nums.size(); ++i) {
      for (int j = 0; j < i; ++j) {
        vector<double> candidates = generate(nums[i], nums[j]);
        for (double num : candidates) {
          vector<double> nextRound{num};
          for (int k = 0; k < nums.size(); ++k) {
            if (k == i || k == j) continue;  // skip used numbers
            nextRound.push_back(nums[k]);
          }
          if (dfs(nextRound)) return true;
        }
      }
    }

    return false;
  }

  vector<double> generate(double a, double b) {
    vector<double> results;
    results.push_back(a + b);
    results.push_back(a - b);
    results.push_back(b - a);
    results.push_back(a * b);
    if (fabs(b) > EPS) results.push_back(a / b);
    if (fabs(a) > EPS) results.push_back(b / a);
    return results;
  }
};

// Example usage
int main() {
  Solution sol;
  vector<int> cards1 = {4, 1, 8, 7};
  vector<int> cards2 = {1, 2, 1, 2};

  cout << boolalpha;
  cout << sol.judgePoint24(cards1) << endl; // true
  cout << sol.judgePoint24(cards2) << endl; // false
}
