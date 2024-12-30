// You are given an integer array nums and an integer target.

// You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

// For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
// Return the number of different expressions that you can build, which evaluates to target.

// Example 1:

// Input: nums = [1,1,1,1,1], target = 3
// Output: 5
// Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
// -1 + 1 + 1 + 1 + 1 = 3
// +1 - 1 + 1 + 1 + 1 = 3
// +1 + 1 - 1 + 1 + 1 = 3
// +1 + 1 + 1 - 1 + 1 = 3
// +1 + 1 + 1 + 1 - 1 = 3
// Example 2:

// Input: nums = [1], target = 1
// Output: 1

// Constraints:

// 1 <= nums.length <= 20
// 0 <= nums[i] <= 1000
// 0 <= sum(nums[i]) <= 1000
// -1000 <= target <= 1000

var findTargetSumWays = function (nums, target) {
  const memo = new Map();

  const dp = (index, currentSum) => {
    if (index === nums.length) {
      return currentSum === target ? 1 : 0;
    }

    const key = `${index},${currentSum}`;
    if (memo.has(key)) {
      return memo.get(key);
    }

    // Calculate the number of ways by adding or subtracting the current number
    const add = dp(index + 1, currentSum + nums[index]);
    const subtract = dp(index + 1, currentSum - nums[index]);

    memo.set(key, add + subtract);
    return add + subtract;
  };

  return dp(0, 0);
};

const nums = [1, 1, 1, 1, 1];
const target = 3;
console.log(findTargetSumWays(nums, target)); // Output: 5

const nums2 = [1];
const target2 = 1;
console.log(findTargetSumWays(nums2, target2)); // Output: 1
