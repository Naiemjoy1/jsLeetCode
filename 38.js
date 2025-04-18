// The count-and-say sequence is a sequence of digit strings defined by the recursive formula:

// countAndSay(1) = "1"
// countAndSay(n) is the run-length encoding of countAndSay(n - 1).
// Run-length encoding (RLE) is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string "3322251" we replace "33" with "23", replace "222" with "32", replace "5" with "15" and replace "1" with "11". Thus the compressed string becomes "23321511".

// Given a positive integer n, return the nth element of the count-and-say sequence.

// Example 1:

// Input: n = 4

// Output: "1211"

// Explanation:

// countAndSay(1) = "1"
// countAndSay(2) = RLE of "1" = "11"
// countAndSay(3) = RLE of "11" = "21"
// countAndSay(4) = RLE of "21" = "1211"
// Example 2:

// Input: n = 1

// Output: "1"

// Explanation:

// This is the base case.

// Constraints:

// 1 <= n <= 30

var countAndSay = function (n) {
  if (n === 1) return "1";

  let current = "1";

  for (let i = 2; i <= n; i++) {
    let next = "";
    let count = 1;

    for (let j = 1; j < current.length; j++) {
      if (current[j] === current[j - 1]) {
        count++;
      } else {
        next += count.toString() + current[j - 1];
        count = 1;
      }
    }

    // Append the last group
    next += count.toString() + current[current.length - 1];

    current = next;
  }

  return current;
};
console.log(countAndSay(1)); // Output: "1"
console.log(countAndSay(4)); // Output: "1211"
console.log(countAndSay(5)); // Output: "111221"
