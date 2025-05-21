// Find all valid combinations of k numbers that sum up to n such that the following conditions are true:

// Only numbers 1 through 9 are used.
// Each number is used at most once.
// Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

 

// Example 1:

// Input: k = 3, n = 7
// Output: [[1,2,4]]
// Explanation:
// 1 + 2 + 4 = 7
// There are no other valid combinations.
// Example 2:

// Input: k = 3, n = 9
// Output: [[1,2,6],[1,3,5],[2,3,4]]
// Explanation:
// 1 + 2 + 6 = 9
// 1 + 3 + 5 = 9
// 2 + 3 + 4 = 9
// There are no other valid combinations.
// Example 3:

// Input: k = 4, n = 1
// Output: []
// Explanation: There are no valid combinations.
// Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.
 

// Constraints:

// 2 <= k <= 9
// 1 <= n <= 60

var combinationSum3 = function(k, n) {
    const result = [];
    
    // Helper function to perform backtracking
    function backtrack(start, currentCombination, currentSum) {
        // If we've selected 'k' numbers and their sum is 'n', add the combination to result
        if (currentCombination.length === k && currentSum === n) {
            result.push([...currentCombination]);
            return;
        }

        // If we've already selected 'k' numbers or exceeded the sum, stop exploring
        if (currentCombination.length > k || currentSum > n) {
            return;
        }

        // Try all numbers from 'start' to 9
        for (let i = start; i <= 9; i++) {
            // Add the number to the current combination
            currentCombination.push(i);
            // Recur with the next number and updated sum
            backtrack(i + 1, currentCombination, currentSum + i);
            // Backtrack by removing the last added number
            currentCombination.pop();
        }
    }

    // Start backtracking with the first number as 1
    backtrack(1, [], 0);
    return result;
};
console.log(combinationSum3(3, 7));  // Output: [[1, 2, 4]]
console.log(combinationSum3(3, 9));  // Output: [[1, 2, 6], [1, 3, 5], [2, 3, 4]]
console.log(combinationSum3(4, 1));  // Output: []
