// You have n  tiles, where each tile has one letter tiles[i] printed on it.

// Return the number of possible non-empty sequences of letters you can make using the letters printed on those tiles.

// Example 1:

// Input: tiles = "AAB"
// Output: 8
// Explanation: The possible sequences are "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA".
// Example 2:

// Input: tiles = "AAABBC"
// Output: 188
// Example 3:

// Input: tiles = "V"
// Output: 1

// Constraints:

// 1 <= tiles.length <= 7
// tiles consists of uppercase English letters.

var numTilePossibilities = function (tiles) {
  let count = 0;
  let freqMap = new Map();

  // Count frequency of each letter
  for (let char of tiles) {
    freqMap.set(char, (freqMap.get(char) || 0) + 1);
  }

  // Backtracking function
  function backtrack() {
    for (let [char, freq] of freqMap.entries()) {
      if (freq > 0) {
        // Use this character
        freqMap.set(char, freq - 1);
        count++; // Count this new sequence

        // Recurse to build more sequences
        backtrack();

        // Restore the frequency after recursion
        freqMap.set(char, freq);
      }
    }
  }

  backtrack();
  return count;
};

// Test cases
console.log(numTilePossibilities("AAB")); // Output: 8
console.log(numTilePossibilities("AAABBC")); // Output: 188
console.log(numTilePossibilities("V")); // Output: 1
