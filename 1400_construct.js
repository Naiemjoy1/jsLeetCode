// Given a string s and an integer k, return true if you can use all the characters in s to construct k palindrome strings or false otherwise.

 

// Example 1:

// Input: s = "annabelle", k = 2
// Output: true
// Explanation: You can construct two palindromes using all characters in s.
// Some possible constructions "anna" + "elble", "anbna" + "elle", "anellena" + "b"
// Example 2:

// Input: s = "leetcode", k = 3
// Output: false
// Explanation: It is impossible to construct 3 palindromes using all the characters of s.
// Example 3:

// Input: s = "true", k = 4
// Output: true
// Explanation: The only possible solution is to put each character in a separate string.
 

// Constraints:

// 1 <= s.length <= 105
// s consists of lowercase English letters.
// 1 <= k <= 105

var canConstruct = function(s, k) {
    if (k > s.length) {
        return false;
    }
    
    const charCount = new Map();
    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    let oddCount = 0;
    for (const count of charCount.values()) {
        if (count % 2 !== 0) {
            oddCount++;
        }
    }
    
    return oddCount <= k;
};
console.log(canConstruct("annabelle", 2)); 
console.log(canConstruct("leetcode", 3));  
console.log(canConstruct("true", 4));      
