// Alice and Bob are playing a game. Initially, Alice has a string word = "a".

// You are given a positive integer k.

// Now Bob will ask Alice to perform the following operation forever:

// Generate a new string by changing each character in word to its next character in the English alphabet, and append it to the original word.
// For example, performing the operation on "c" generates "cd" and performing the operation on "zb" generates "zbac".

// Return the value of the kth character in word, after enough operations have been done for word to have at least k characters.

// Note that the character 'z' can be changed to 'a' in the operation.

// Example 1:

// Input: k = 5

// Output: "b"

// Explanation:

// Initially, word = "a". We need to do the operation three times:

// Generated string is "b", word becomes "ab".
// Generated string is "bc", word becomes "abbc".
// Generated string is "bccd", word becomes "abbcbccd".
// Example 2:

// Input: k = 10

// Output: "c"

// Constraints:

// 1 <= k <= 500

var kthCharacter = function (k) {
  let word = ["a"];

  while (word.length < k) {
    const nextPart = word.map(nextChar);
    word = word.concat(nextPart);
  }

  return word[k - 1];
};

function nextChar(c) {
  return c === "z" ? "a" : String.fromCharCode(c.charCodeAt(0) + 1);
}
console.log(kthCharacter(5)); // Output: "b"
console.log(kthCharacter(10)); // Output: "c"
console.log(kthCharacter(1)); // Output: "a"
console.log(kthCharacter(15)); // Output: "d"
