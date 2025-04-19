// Given a 0-indexed integer array nums of size n and two integers lower and upper, return the number of fair pairs.

// A pair (i, j) is fair if:

// 0 <= i < j < n, and
// lower <= nums[i] + nums[j] <= upper

// Example 1:

// Input: nums = [0,1,7,4,4,5], lower = 3, upper = 6
// Output: 6
// Explanation: There are 6 fair pairs: (0,3), (0,4), (0,5), (1,3), (1,4), and (1,5).
// Example 2:

// Input: nums = [1,7,9,2,5], lower = 11, upper = 11
// Output: 1
// Explanation: There is a single fair pair: (2,3).

// Constraints:

// 1 <= nums.length <= 105
// nums.length == n
// -109 <= nums[i] <= 109
// -109 <= lower <= upper <= 109

var countFairPairs = function (nums, lower, upper) {
  nums.sort((a, b) => a - b); // sort the array
  let n = nums.length;
  let count = 0;

  const lowerBound = (arr, target) => {
    let left = 0,
      right = arr.length;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] < target) left = mid + 1;
      else right = mid;
    }
    return left;
  };

  const upperBound = (arr, target) => {
    let left = 0,
      right = arr.length;
    while (left < right) {
      let mid = Math.floor((left + right) / 2);
      if (arr[mid] <= target) left = mid + 1;
      else right = mid;
    }
    return left;
  };

  for (let i = 0; i < n; i++) {
    let left = lowerBound(nums, lower - nums[i]);
    let right = upperBound(nums, upper - nums[i]);
    // Only count pairs where j > i
    count += Math.max(0, right - Math.max(left, i + 1));
  }

  return count;
};
console.log(countFairPairs([0, 1, 7, 4, 4, 5], 3, 6)); // Output: 6
console.log(countFairPairs([1, 7, 9, 2, 5], 11, 11)); // Output: 1
