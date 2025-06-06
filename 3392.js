// Given an integer array nums, return the number of subarrays of length 3 such that the sum of the first and third numbers equals exactly half of the second number.

// Example 1:

// Input: nums = [1,2,1,4,1]

// Output: 1

// Explanation:

// Only the subarray [1,4,1] contains exactly 3 elements where the sum of the first and third numbers equals half the middle number.

// Example 2:

// Input: nums = [1,1,1]

// Output: 0

// Explanation:

// [1,1,1] is the only subarray of length 3. However, its first and third numbers do not add to half the middle number.

// Constraints:

// 3 <= nums.length <= 100
// -100 <= nums[i] <= 100

var countSubarrays = function (nums) {
  let count = 0;

  for (let i = 0; i <= nums.length - 3; i++) {
    let first = nums[i];
    let middle = nums[i + 1];
    let third = nums[i + 2];

    if (first + third === middle / 2) {
      count++;
    }
  }

  return count;
};
console.log(countSubarrays([1, 2, 1, 4, 1])); // Output: 1
console.log(countSubarrays([1, 1, 1])); // Output: 0
