// You are given an integer array nums of length n and a 2D array queries where queries[i] = [li, ri].

// Each queries[i] represents the following action on nums:

// Decrement the value at each index in the range [li, ri] in nums by at most 1.
// The amount by which the value is decremented can be chosen independently for each index.
// A Zero Array is an array with all its elements equal to 0.

// Return the maximum number of elements that can be removed from queries, such that nums can still be converted to a zero array using the remaining queries. If it is not possible to convert nums to a zero array, return -1.

// Example 1:

// Input: nums = [2,0,2], queries = [[0,2],[0,2],[1,1]]

// Output: 1

// Explanation:

// After removing queries[2], nums can still be converted to a zero array.

// Using queries[0], decrement nums[0] and nums[2] by 1 and nums[1] by 0.
// Using queries[1], decrement nums[0] and nums[2] by 1 and nums[1] by 0.
// Example 2:

// Input: nums = [1,1,1,1], queries = [[1,3],[0,2],[1,3],[1,2]]

// Output: 2

// Explanation:

// We can remove queries[2] and queries[3].

// Example 3:

// Input: nums = [1,2,3,4], queries = [[0,3]]

// Output: -1

// Explanation:

// nums cannot be converted to a zero array even after using all the queries.

// Constraints:

// 1 <= nums.length <= 105
// 0 <= nums[i] <= 105
// 1 <= queries.length <= 105
// queries[i].length == 2
// 0 <= li <= ri < nums.length

var maxRemoval = function (nums, queries) {
  const n = nums.length;
  const m = queries.length;

  const canConvert = (skipCount) => {
    // Initialize difference array of length n+1
    const diff = new Array(n + 1).fill(0);

    // Apply remaining queries after skipping the first `skipCount`
    for (let i = skipCount; i < m; i++) {
      const [l, r] = queries[i];
      diff[l] += 1;
      if (r + 1 < n) diff[r + 1] -= 1;
    }

    // Build the actual frequency array from the difference array
    const freq = new Array(n).fill(0);
    freq[0] = diff[0];
    for (let i = 1; i < n; i++) {
      freq[i] = freq[i - 1] + diff[i];
    }

    // Check if for every index i, freq[i] >= nums[i]
    for (let i = 0; i < n; i++) {
      if (freq[i] < nums[i]) return false;
    }

    return true;
  };

  // Binary search the maximum number of queries we can remove
  let left = 0,
    right = m,
    ans = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (canConvert(mid)) {
      ans = mid; // mid queries can be removed
      left = mid + 1; // try to remove more
    } else {
      right = mid - 1; // try fewer
    }
  }

  return ans;
};
console.log(
  maxRemoval(
    [2, 0, 2],
    [
      [0, 2],
      [0, 2],
      [1, 1],
    ]
  )
); // 1
console.log(
  maxRemoval(
    [1, 1, 1, 1],
    [
      [1, 3],
      [0, 2],
      [1, 3],
      [1, 2],
    ]
  )
); // 2
console.log(maxRemoval([1, 2, 3, 4], [[0, 3]])); // -1
