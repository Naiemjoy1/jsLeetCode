// Given an integer array nums and an integer k, return the length of the shortest non-empty subarray of nums with a sum of at least k. If there is no such subarray, return -1.

// A subarray is a contiguous part of an array.

// Example 1:

// Input: nums = [1], k = 1
// Output: 1
// Example 2:

// Input: nums = [1,2], k = 4
// Output: -1
// Example 3:

// Input: nums = [2,-1,2], k = 3
// Output: 3

// Constraints:

// 1 <= nums.length <= 105
// -105 <= nums[i] <= 105
// 1 <= k <= 109

var shortestSubarray = function (nums, k) {
  const n = nums.length;
  const prefix = new Array(n + 1).fill(0);

  // Compute prefix sums
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  let result = Infinity;
  const deque = [];

  for (let i = 0; i <= n; i++) {
    // Remove indices from the front of the deque if the subarray sum is >= k
    while (deque.length > 0 && prefix[i] - prefix[deque[0]] >= k) {
      result = Math.min(result, i - deque.shift());
    }

    // Remove indices from the back of the deque if they are no longer useful
    while (deque.length > 0 && prefix[i] <= prefix[deque[deque.length - 1]]) {
      deque.pop();
    }

    // Add the current index to the deque
    deque.push(i);
  }

  return result === Infinity ? -1 : result;
};

console.log(shortestSubarray([1], 1)); // Output: 1
console.log(shortestSubarray([1, 2], 4)); // Output: -1
console.log(shortestSubarray([2, -1, 2], 3)); // Output: 3
console.log(shortestSubarray([1, 2, 3, 4, 5], 11)); // Output: 3
