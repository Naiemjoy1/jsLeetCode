// You are given a string array words, and an array groups, both arrays having length n.

// The hamming distance between two strings of equal length is the number of positions at which the corresponding characters are different.

// You need to select the longest subsequence from an array of indices [0, 1, ..., n - 1], such that for the subsequence denoted as [i0, i1, ..., ik-1] having length k, the following holds:

// For adjacent indices in the subsequence, their corresponding groups are unequal, i.e., groups[ij] != groups[ij+1], for each j where 0 < j + 1 < k.
// words[ij] and words[ij+1] are equal in length, and the hamming distance between them is 1, where 0 < j + 1 < k, for all indices in the subsequence.
// Return a string array containing the words corresponding to the indices (in order) in the selected subsequence. If there are multiple answers, return any of them.

// Note: strings in words may be unequal in length.

// Example 1:

// Input: words = ["bab","dab","cab"], groups = [1,2,2]

// Output: ["bab","cab"]

// Explanation: A subsequence that can be selected is [0,2].

// groups[0] != groups[2]
// words[0].length == words[2].length, and the hamming distance between them is 1.
// So, a valid answer is [words[0],words[2]] = ["bab","cab"].

// Another subsequence that can be selected is [0,1].

// groups[0] != groups[1]
// words[0].length == words[1].length, and the hamming distance between them is 1.
// So, another valid answer is [words[0],words[1]] = ["bab","dab"].

// It can be shown that the length of the longest subsequence of indices that satisfies the conditions is 2.

// Example 2:

// Input: words = ["a","b","c","d"], groups = [1,2,3,4]

// Output: ["a","b","c","d"]

// Explanation: We can select the subsequence [0,1,2,3].

// It satisfies both conditions.

// Hence, the answer is [words[0],words[1],words[2],words[3]] = ["a","b","c","d"].

// It has the longest length among all subsequences of indices that satisfy the conditions.

// Hence, it is the only answer.

// Constraints:

// 1 <= n == words.length == groups.length <= 1000
// 1 <= words[i].length <= 10
// 1 <= groups[i] <= n
// words consists of distinct strings.
// words[i] consists of lowercase English letters.

var getWordsInLongestSubsequence = function (words, groups) {
  const n = words.length;

  // Function to compute hamming distance
  function hammingDist(w1, w2) {
    if (w1.length !== w2.length) return -1;
    let dist = 0;
    for (let i = 0; i < w1.length; i++) {
      if (w1[i] !== w2[i]) dist++;
      if (dist > 1) return -1;
    }
    return dist;
  }

  // Build adjacency list for valid transitions
  const adj = Array.from({ length: n }, () => []);
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (
        i !== j &&
        groups[i] !== groups[j] &&
        words[i].length === words[j].length &&
        hammingDist(words[i], words[j]) === 1
      ) {
        adj[i].push(j);
      }
    }
  }

  // DP to store longest path ending at each node
  const dp = Array(n).fill(1); // At least the node itself
  const prev = Array(n).fill(-1); // For reconstructing path

  for (let i = 0; i < n; i++) {
    for (const nei of adj[i]) {
      if (dp[i] + 1 > dp[nei]) {
        dp[nei] = dp[i] + 1;
        prev[nei] = i;
      }
    }
  }

  // Find the index of the longest path
  let maxLen = 0,
    endIndex = 0;
  for (let i = 0; i < n; i++) {
    if (dp[i] > maxLen) {
      maxLen = dp[i];
      endIndex = i;
    }
  }

  // Reconstruct the path
  const path = [];
  while (endIndex !== -1) {
    path.push(words[endIndex]);
    endIndex = prev[endIndex];
  }

  return path.reverse();
};
console.log(getWordsInLongestSubsequence(["bab", "dab", "cab"], [1, 2, 2]));
// Output: ["bab", "cab"] OR ["bab", "dab"]

console.log(getWordsInLongestSubsequence(["a", "b", "c", "d"], [1, 2, 3, 4]));
// Output: ["a", "b", "c", "d"]
