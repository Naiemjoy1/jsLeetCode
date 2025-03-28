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
  nums.sort((a, b) => a - b);
  let count = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    let left = i + 1;

    let lowBound = lowerBound(nums, left, nums.length - 1, lower - nums[i]);

    let upBound = upperBound(nums, left, nums.length - 1, upper - nums[i]);

    let pairs = Math.max(0, upBound - lowBound + 1);
    count += pairs;

    console.log(`i: ${i}, nums[i]: ${nums[i]}`);
    console.log(
      `lower bound index (lowBound): ${lowBound}, upper bound index (upBound): ${upBound}`
    );
    console.log(`Pairs added for nums[i]: ${pairs}`);
    console.log(`Current total count: ${count}`);
    console.log("---");
  }

  return count;
};

function lowerBound(nums, left, right, target) {
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] >= target) right = mid - 1;
    else left = mid + 1;
  }
  return left;
}

function upperBound(nums, left, right, target) {
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] <= target) left = mid + 1;
    else right = mid - 1;
  }
  return right;
}

const nums = [0, 1, 7, 4, 4, 5];
const lower = 3;
const upper = 6;
console.log(`Total fair pairs: ${countFairPairs(nums, lower, upper)}`);
