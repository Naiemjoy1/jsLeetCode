// Given an integer array nums and an integer k, find three non-overlapping subarrays of length k with maximum sum and return them.

// Return the result as a list of indices representing the starting position of each interval (0-indexed). If there are multiple answers, return the lexicographically smallest one.

 

// Example 1:

// Input: nums = [1,2,1,2,6,7,5,1], k = 2
// Output: [0,3,5]
// Explanation: Subarrays [1, 2], [2, 6], [7, 5] correspond to the starting indices [0, 3, 5].
// We could have also taken [2, 1], but an answer of [1, 3, 5] would be lexicographically larger.
// Example 2:

// Input: nums = [1,2,1,2,1,2,1,2,1], k = 2
// Output: [0,2,4]
 

// Constraints:

// 1 <= nums.length <= 2 * 104
// 1 <= nums[i] < 216
// 1 <= k <= floor(nums.length / 3)

var maxSumOfThreeSubarrays = function(nums, k) {
    const n = nums.length;
    const sums = Array(n - k + 1).fill(0); // Store sums of subarrays of length k
    const left = Array(n - k + 1).fill(0); // Best starting index for the left subarray
    const right = Array(n - k + 1).fill(0); // Best starting index for the right subarray

    // Step 1: Calculate the sums of all subarrays of length k
    let currentSum = 0;
    for (let i = 0; i < n; i++) {
        currentSum += nums[i];
        if (i >= k) currentSum -= nums[i - k];
        if (i >= k - 1) sums[i - k + 1] = currentSum;
    }

    // Step 2: Calculate the best left index for each position
    let bestLeftIndex = 0;
    for (let i = 0; i < sums.length; i++) {
        if (sums[i] > sums[bestLeftIndex]) bestLeftIndex = i;
        left[i] = bestLeftIndex;
    }

    // Step 3: Calculate the best right index for each position
    let bestRightIndex = sums.length - 1;
    for (let i = sums.length - 1; i >= 0; i--) {
        if (sums[i] >= sums[bestRightIndex]) bestRightIndex = i;
        right[i] = bestRightIndex;
    }

    // Step 4: Find the maximum sum by trying every middle subarray
    let maxSum = 0;
    let result = [];
    for (let middle = k; middle < sums.length - k; middle++) {
        const l = left[middle - k];
        const r = right[middle + k];
        const totalSum = sums[l] + sums[middle] + sums[r];
        if (totalSum > maxSum) {
            maxSum = totalSum;
            result = [l, middle, r];
        }
    }

    return result;
};
