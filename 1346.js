// Given an array arr of integers, check if there exist two indices i and j such that :

// i != j
// 0 <= i, j < arr.length
// arr[i] == 2 * arr[j]

// Example 1:

// Input: arr = [10,2,5,3]
// Output: true
// Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]
// Example 2:

// Input: arr = [3,1,7,11]
// Output: false
// Explanation: There is no i and j that satisfy the conditions.

// Constraints:

// 2 <= arr.length <= 500
// -103 <= arr[i] <= 103

var checkIfExist = function (arr) {
  // Create a set to store numbers we've seen so far
  let seen = new Set();

  // Iterate through the array
  for (let num of arr) {
    // Check if double or half of the current number exists in the set
    if (seen.has(num * 2) || (num % 2 === 0 && seen.has(num / 2))) {
      return true;
    }
    // Add the current number to the set
    seen.add(num);
  }

  // If no such pair exists, return false
  return false;
};

// Example 1
console.log(checkIfExist([10, 2, 5, 3])); // Output: true

// Example 2
console.log(checkIfExist([3, 1, 7, 11])); // Output: false
