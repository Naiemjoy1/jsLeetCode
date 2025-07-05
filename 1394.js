// Given an array of integers arr, a lucky integer is an integer that has a frequency in the array equal to its value.

// Return the largest lucky integer in the array. If there is no lucky integer return -1.

// Example 1:

// Input: arr = [2,2,3,4]
// Output: 2
// Explanation: The only lucky number in the array is 2 because frequency[2] == 2.
// Example 2:

// Input: arr = [1,2,2,3,3,3]
// Output: 3
// Explanation: 1, 2 and 3 are all lucky numbers, return the largest of them.
// Example 3:

// Input: arr = [2,2,2,3,3]
// Output: -1
// Explanation: There are no lucky numbers in the array.

// Constraints:

// 1 <= arr.length <= 500
// 1 <= arr[i] <= 500

var findLucky = function (arr) {
  const freq = {};

  // Count frequency
  for (let num of arr) {
    freq[num] = (freq[num] || 0) + 1;
  }

  let result = -1;

  // Check lucky numbers
  for (let num in freq) {
    if (parseInt(num) === freq[num]) {
      result = Math.max(result, parseInt(num));
    }
  }

  return result;
};
console.log(findLucky([2, 2, 3, 4])); // Output: 2
console.log(findLucky([1, 2, 2, 3, 3, 3])); // Output: 3
console.log(findLucky([2, 2, 2, 3, 3])); // Output: -1
console.log(findLucky([5])); // Output: -1
console.log(findLucky([7, 7, 7, 7, 7, 7, 7])); // Output: 7
