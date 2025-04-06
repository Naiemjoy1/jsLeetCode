// Given a set of distinct positive integers nums, return the largest subset answer such that every pair (answer[i], answer[j]) of elements in this subset satisfies:

// answer[i] % answer[j] == 0, or
// answer[j] % answer[i] == 0
// If there are multiple solutions, return any of them.

// Example 1:

// Input: nums = [1,2,3]
// Output: [1,2]
// Explanation: [1,3] is also accepted.
// Example 2:

// Input: nums = [1,2,4,8]
// Output: [1,2,4,8]

// Constraints:

// 1 <= nums.length <= 1000
// 1 <= nums[i] <= 2 * 109
// All the integers in nums are unique.

var largestDivisibleSubset = function (nums) {
  if (nums.length === 0) return [];

  nums.sort((a, b) => a - b); // Sort the array

  const n = nums.length;
  const dp = new Array(n).fill(1); // dp[i] = size of largest divisible subset ending at i
  const prev = new Array(n).fill(-1); // prev[i] = index of previous element in the subset

  let maxIndex = 0;

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] % nums[j] === 0 && dp[j] + 1 > dp[i]) {
        dp[i] = dp[j] + 1;
        prev[i] = j;
      }
    }
    if (dp[i] > dp[maxIndex]) {
      maxIndex = i;
    }
  }

  // Reconstruct the subset
  const result = [];
  while (maxIndex !== -1) {
    result.unshift(nums[maxIndex]);
    maxIndex = prev[maxIndex];
  }

  return result;
};
console.log(largestDivisibleSubset([1, 2, 3])); // Output: [1, 2] or [1, 3]
console.log(largestDivisibleSubset([1, 2, 4, 8])); // Output: [1, 2, 4, 8]
