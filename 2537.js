// Given an integer array nums and an integer k, return the number of good subarrays of nums.

// A subarray arr is good if there are at least k pairs of indices (i, j) such that i < j and arr[i] == arr[j].

// A subarray is a contiguous non-empty sequence of elements within an array.

// Example 1:

// Input: nums = [1,1,1,1,1], k = 10
// Output: 1
// Explanation: The only good subarray is the array nums itself.
// Example 2:

// Input: nums = [3,1,4,3,2,2,4], k = 2
// Output: 4
// Explanation: There are 4 different good subarrays:
// - [3,1,4,3,2,2] that has 2 pairs.
// - [3,1,4,3,2,2,4] that has 3 pairs.
// - [1,4,3,2,2,4] that has 2 pairs.
// - [4,3,2,2,4] that has 2 pairs.

// Constraints:

// 1 <= nums.length <= 105
// 1 <= nums[i], k <= 109

var countGood = function (nums, k) {
  let left = 0;
  let count = 0;
  let freq = new Map();
  let pairs = 0;
  let result = 0;

  for (let right = 0; right < nums.length; right++) {
    let val = nums[right];
    let existingFreq = freq.get(val) || 0;

    // Adding new element, update pair count
    pairs += existingFreq;
    freq.set(val, existingFreq + 1);

    // Shrink the window from the left if we have enough pairs
    while (pairs >= k) {
      result += nums.length - right; // all subarrays ending from right to end are valid
      let leftVal = nums[left];
      let leftFreq = freq.get(leftVal);
      pairs -= leftFreq - 1; // remove contribution of left element
      freq.set(leftVal, leftFreq - 1);
      left++;
    }
  }

  return result;
};
console.log(countGood([1, 1, 1, 1, 1], 10)); // Output: 1
console.log(countGood([3, 1, 4, 3, 2, 2, 4], 2)); // Output: 4
