// You are given a string s. We want to partition the string into as many parts as possible so that each letter appears in at most one part. For example, the string "ababcc" can be partitioned into ["abab", "cc"], but partitions such as ["aba", "bcc"] or ["ab", "ab", "cc"] are invalid.

// Note that the partition is done so that after concatenating all the parts in order, the resultant string should be s.

// Return a list of integers representing the size of these parts.

// Example 1:

// Input: s = "ababcbacadefegdehijhklij"
// Output: [9,7,8]
// Explanation:
// The partition is "ababcbaca", "defegde", "hijhklij".
// This is a partition so that each letter appears in at most one part.
// A partition like "ababcbacadefegde", "hijhklij" is incorrect, because it splits s into less parts.
// Example 2:

// Input: s = "eccbbbbdec"
// Output: [10]

// Constraints:

// 1 <= s.length <= 500
// s consists of lowercase English letters.

var partitionLabels = function (s) {
  // Step 1: Record the last index of each character
  const lastIndex = new Map();
  for (let i = 0; i < s.length; i++) {
    lastIndex.set(s[i], i);
  }

  let result = [];
  let start = 0;
  let end = 0;

  // Step 2: Traverse the string to find partitions
  for (let i = 0; i < s.length; i++) {
    // Update the end pointer to the farthest last occurrence of the current character
    end = Math.max(end, lastIndex.get(s[i]));

    // If we have reached the boundary of the current partition
    if (i === end) {
      // Record the size of the partition
      result.push(i - start + 1);
      // Update the start pointer for the next partition
      start = i + 1;
    }
  }

  return result;
};

// Test cases
console.log(partitionLabels("ababcbacadefegdehijhklij")); // Output: [9, 7, 8]
console.log(partitionLabels("eccbbbbdec")); // Output: [10]
