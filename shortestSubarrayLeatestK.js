// ou are given an array nums of non-negative integers and an integer k.

// An array is called special if the bitwise OR of all of its elements is at least k.

// Return the length of the shortest special non-empty
// subarray
//  of nums, or return -1 if no special subarray exists.

// Example 1:

// Input: nums = [1,2,3], k = 2

// Output: 1

// Explanation:

// The subarray [3] has OR value of 3. Hence, we return 1.

// Example 2:

// Input: nums = [2,1,8], k = 10

// Output: 3

// Explanation:

// The subarray [2,1,8] has OR value of 11. Hence, we return 3.

// Example 3:

// Input: nums = [1,2], k = 0

// Output: 1

// Explanation:

// The subarray [1] has OR value of 1. Hence, we return 1.

var minimumSubarrayLength = function (nums, k) {
  let n = nums.length;
  let minLength = Infinity; // Initialize to a large value.
  let found = false;

  for (let start = 0; start < n; start++) {
    let orValue = 0;
    for (let end = start; end < n; end++) {
      orValue |= nums[end]; // Compute the OR of the subarray.
      if (orValue >= k) {
        minLength = Math.min(minLength, end - start + 1);
        found = true;
        break; // No need to continue expanding this subarray.
      }
    }
  }

  return found ? minLength : -1; // Return the result.
};
