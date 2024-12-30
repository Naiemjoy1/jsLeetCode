// You are given a list of strings of the same length words and a string target.

// Your task is to form target using the given words under the following rules:

// target should be formed from left to right.
// To form the ith character (0-indexed) of target, you can choose the kth character of the jth string in words if target[i] = words[j][k].
// Once you use the kth character of the jth string of words, you can no longer use the xth character of any string in words where x <= k. In other words, all characters to the left of or at index k become unusuable for every string.
// Repeat the process until you form the string target.
// Notice that you can use multiple characters from the same string in words provided the conditions above are met.

// Return the number of ways to form target from words. Since the answer may be too large, return it modulo 109 + 7.

 

// Example 1:

// Input: words = ["acca","bbbb","caca"], target = "aba"
// Output: 6
// Explanation: There are 6 ways to form target.
// "aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("caca")
// "aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("caca")
// "aba" -> index 0 ("acca"), index 1 ("bbbb"), index 3 ("acca")
// "aba" -> index 0 ("acca"), index 2 ("bbbb"), index 3 ("acca")
// "aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("acca")
// "aba" -> index 1 ("caca"), index 2 ("bbbb"), index 3 ("caca")
// Example 2:

// Input: words = ["abba","baab"], target = "bab"
// Output: 4
// Explanation: There are 4 ways to form target.
// "bab" -> index 0 ("baab"), index 1 ("baab"), index 2 ("abba")
// "bab" -> index 0 ("baab"), index 1 ("baab"), index 3 ("baab")
// "bab" -> index 0 ("baab"), index 2 ("baab"), index 3 ("baab")
// "bab" -> index 1 ("abba"), index 2 ("baab"), index 3 ("baab")
 

// Constraints:

// 1 <= words.length <= 1000
// 1 <= words[i].length <= 1000
// All strings in words have the same length.
// 1 <= target.length <= 1000
// words[i] and target contain only lowercase English letters.

var numWays = function(words, target) {
    const MOD = 1e9 + 7;
    const m = words[0].length;
    const n = target.length;

    // Precompute character frequency at each position
    const freq = Array.from({ length: m }, () => Array(26).fill(0));
    for (const word of words) {
        for (let i = 0; i < m; i++) {
            freq[i][word[i].charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
    }

    // DP array: dp[j] represents ways to form target[j:]
    const dp = Array(n + 1).fill(0);
    dp[n] = 1; // Base case: 1 way to form an empty target

    for (let i = m - 1; i >= 0; i--) {
        for (let j = n - 1; j >= 0; j--) {
            const targetChar = target[j].charCodeAt(0) - 'a'.charCodeAt(0);
            dp[j] += freq[i][targetChar] * dp[j + 1];
            dp[j] %= MOD;
        }
    }

    return dp[0];
};
console.log(numWays(["acca", "bbbb", "caca"], "aba")); // Output: 6
console.log(numWays(["abba", "baab"], "bab")); // Output: 4
