// Given an integer n, find a sequence that satisfies all of the following:

// The integer 1 occurs once in the sequence.
// Each integer between 2 and n occurs twice in the sequence.
// For every integer i between 2 and n, the distance between the two occurrences of i is exactly i.
// The distance between two numbers on the sequence, a[i] and a[j], is the absolute difference of their indices, |j - i|.

// Return the lexicographically largest sequence. It is guaranteed that under the given constraints, there is always a solution.

// A sequence a is lexicographically larger than a sequence b (of the same length) if in the first position where a and b differ, sequence a has a number greater than the corresponding number in b. For example, [0,1,9,0] is lexicographically larger than [0,1,5,6] because the first position they differ is at the third number, and 9 is greater than 5.

// Example 1:

// Input: n = 3
// Output: [3,1,2,3,2]
// Explanation: [2,3,2,1,3] is also a valid sequence, but [3,1,2,3,2] is the lexicographically largest valid sequence.
// Example 2:

// Input: n = 5
// Output: [5,3,1,4,3,5,2,4,2]

// Constraints:

// 1 <= n <= 20

var constructDistancedSequence = function (n) {
  const length = 2 * n - 1;
  const result = new Array(length).fill(0);
  const used = new Array(n + 1).fill(false);

  const backtrack = (index) => {
    if (index === length) return true;

    if (result[index] !== 0) return backtrack(index + 1);

    for (let num = n; num >= 1; num--) {
      if (used[num]) continue;

      if (num === 1) {
        result[index] = 1;
        used[num] = true;

        if (backtrack(index + 1)) return true;

        result[index] = 0;
        used[num] = false;
      } else {
        let secondIndex = index + num;
        if (secondIndex < length && result[secondIndex] === 0) {
          result[index] = result[secondIndex] = num;
          used[num] = true;

          if (backtrack(index + 1)) return true;

          result[index] = result[secondIndex] = 0;
          used[num] = false;
        }
      }
    }
    return false;
  };

  backtrack(0);
  return result;
};

// Example usage:
console.log(constructDistancedSequence(3)); // Output: [3,1,2,3,2]
console.log(constructDistancedSequence(5)); // Output: [5,3,1,4,3,5,2,4,2]
