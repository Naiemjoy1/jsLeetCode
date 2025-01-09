// You are given an array of strings words and a string pref.

// Return the number of strings in words that contain pref as a prefix.

// A prefix of a string s is any leading contiguous substring of s.

 

// Example 1:

// Input: words = ["pay","attention","practice","attend"], pref = "at"
// Output: 2
// Explanation: The 2 strings that contain "at" as a prefix are: "attention" and "attend".
// Example 2:

// Input: words = ["leetcode","win","loops","success"], pref = "code"
// Output: 0
// Explanation: There are no strings that contain "code" as a prefix.
 

// Constraints:

// 1 <= words.length <= 100
// 1 <= words[i].length, pref.length <= 100
// words[i] and pref consist of lowercase English letters.

var prefixCount = function(words, pref) {
    let count = 0;
    
    for (let word of words) {
        if (word.startsWith(pref)) {
            count++;
        }
    }
    
    return count;
};

let words1 = ["pay", "attention", "practice", "attend"];
let pref1 = "at";
console.log(prefixCount(words1, pref1)); 

let words2 = ["leetcode", "win", "loops", "success"];
let pref2 = "code";
console.log(prefixCount(words2, pref2)); 
