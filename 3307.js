// Alice and Bob are playing a game. Initially, Alice has a string word = "a".

// You are given a positive integer k. You are also given an integer array operations, where operations[i] represents the type of the ith operation.

// Now Bob will ask Alice to perform all operations in sequence:

// If operations[i] == 0, append a copy of word to itself.
// If operations[i] == 1, generate a new string by changing each character in word to its next character in the English alphabet, and append it to the original word. For example, performing the operation on "c" generates "cd" and performing the operation on "zb" generates "zbac".
// Return the value of the kth character in word after performing all the operations.

// Note that the character 'z' can be changed to 'a' in the second type of operation.

// Example 1:

// Input: k = 5, operations = [0,0,0]

// Output: "a"

// Explanation:

// Initially, word == "a". Alice performs the three operations as follows:

// Appends "a" to "a", word becomes "aa".
// Appends "aa" to "aa", word becomes "aaaa".
// Appends "aaaa" to "aaaa", word becomes "aaaaaaaa".
// Example 2:

// Input: k = 10, operations = [0,1,0,1]

// Output: "b"

// Explanation:

// Initially, word == "a". Alice performs the four operations as follows:

// Appends "a" to "a", word becomes "aa".
// Appends "bb" to "aa", word becomes "aabb".
// Appends "aabb" to "aabb", word becomes "aabbaabb".
// Appends "bbccbbcc" to "aabbaabb", word becomes "aabbaabbbbccbbcc".

// Constraints:

// 1 <= k <= 1014
// 1 <= operations.length <= 100
// operations[i] is either 0 or 1.
// The input is generated such that word has at least k characters after all operations.

var kthCharacter = function (k, operations) {
  k = BigInt(k); // handle large k
  let shifts = 0n;

  for (let i = operations.length - 1; i >= 0; i--) {
    if (operations[i] === 0) {
      // Revert append original word
      if (k > 1n << BigInt(i)) {
        k -= 1n << BigInt(i); // second half
      }
    } else {
      // Revert append shifted word
      if (k > 1n << BigInt(i)) {
        k -= 1n << BigInt(i);
        shifts += 1n; // count how many +1 shifts we need to undo
      }
    }
  }

  // Now k must point to a character in the original word "a"
  let charCode = "a".charCodeAt(0);
  charCode = (charCode - 97 + Number(shifts % 26n)) % 26;
  return String.fromCharCode(97 + charCode);
};

console.log(kthCharacter(5, [0, 0, 0])); // "a"
console.log(kthCharacter(10, [0, 1, 0, 1])); // "b"
console.log(kthCharacter(1e14, Array(100).fill(0))); // "a"
