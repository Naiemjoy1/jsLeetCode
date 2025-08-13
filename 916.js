// You are given two string arrays words1 and words2.

// A string b is a subset of string a if every letter in b occurs in a including multiplicity.

// For example, "wrr" is a subset of "warrior" but is not a subset of "world".
// A string a from words1 is universal if for every string b in words2, b is a subset of a.

// Return an array of all the universal strings in words1. You may return the answer in any order.

 

// Example 1:

// Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["e","o"]
// Output: ["facebook","google","leetcode"]
// Example 2:

// Input: words1 = ["amazon","apple","facebook","google","leetcode"], words2 = ["l","e"]
// Output: ["apple","google","leetcode"]
 

// Constraints:

// 1 <= words1.length, words2.length <= 104
// 1 <= words1[i].length, words2[i].length <= 10
// words1[i] and words2[i] consist only of lowercase English letters.
// All the strings of words1 are unique.

var wordSubsets = function(words1, words2) {
    // Function to calculate the frequency of each character in a word
    const getCharFrequency = (word) => {
        let freq = new Array(26).fill(0); // Array for 'a' to 'z'
        for (let char of word) {
            freq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
        }
        return freq;
    };

    // Find the maximum frequency of each character across all words in words2
    let maxFreq = new Array(26).fill(0);
    for (let word of words2) {
        let freq = getCharFrequency(word);
        for (let i = 0; i < 26; i++) {
            maxFreq[i] = Math.max(maxFreq[i], freq[i]);
        }
    }

    // Check which words in words1 are universal
    let result = [];
    for (let word of words1) {
        let freq = getCharFrequency(word);
        let isUniversal = true;
        for (let i = 0; i < 26; i++) {
            if (freq[i] < maxFreq[i]) {
                isUniversal = false;
                break;
            }
        }
        if (isUniversal) result.push(word);
    }

    return result;
};

// Example 1
let words1 = ["amazon", "apple", "facebook", "google", "leetcode"];
let words2 = ["e", "o"];
console.log(wordSubsets(words1, words2)); // Output: ["facebook", "google", "leetcode"]

// Example 2
words1 = ["amazon", "apple", "facebook", "google", "leetcode"];
words2 = ["l", "e"];
console.log(wordSubsets(words1, words2)); // Output: ["apple", "google", "leetcode"]
