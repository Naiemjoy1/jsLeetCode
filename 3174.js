// You are given a string s.

// Your task is to remove all digits by doing this operation repeatedly:

// Delete the first digit and the closest non-digit character to its left.
// Return the resulting string after removing all digits.

 

// Example 1:

// Input: s = "abc"

// Output: "abc"

// Explanation:

// There is no digit in the string.

// Example 2:

// Input: s = "cb34"

// Output: ""

// Explanation:

// First, we apply the operation on s[2], and s becomes "c4".

// Then we apply the operation on s[1], and s becomes "".

 

// Constraints:

// 1 <= s.length <= 100
// s consists only of lowercase English letters and digits.
// The input is generated such that it is possible to delete all digits.

var clearDigits = function(s) {
    let stack = [];

    for (let char of s) {
        if (/\d/.test(char)) {
            // If the current character is a digit, remove the closest non-digit character to its left
            while (stack.length && /\d/.test(stack[stack.length - 1])) {
                stack.pop();
            }
            if (stack.length) {
                stack.pop(); // Remove the closest non-digit character
            }
        } else {
            stack.push(char);
        }
    }

    return stack.join('');
};

// Example Test Cases
console.log(clearDigits("abc")); // Output: "abc"
console.log(clearDigits("cb34")); // Output: ""
console.log(clearDigits("a1b2c3d4")); // Output: ""
console.log(clearDigits("x9y8z7")); // Output: ""
console.log(clearDigits("hello123")); // Output: "he"
