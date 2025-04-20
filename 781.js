// There is a forest with an unknown number of rabbits. We asked n rabbits "How many rabbits have the same color as you?" and collected the answers in an integer array answers where answers[i] is the answer of the ith rabbit.

// Given the array answers, return the minimum number of rabbits that could be in the forest.

// Example 1:

// Input: answers = [1,1,2]
// Output: 5
// Explanation:
// The two rabbits that answered "1" could both be the same color, say red.
// The rabbit that answered "2" can't be red or the answers would be inconsistent.
// Say the rabbit that answered "2" was blue.
// Then there should be 2 other blue rabbits in the forest that didn't answer into the array.
// The smallest possible number of rabbits in the forest is therefore 5: 3 that answered plus 2 that didn't.
// Example 2:

// Input: answers = [10,10,10]
// Output: 11

// Constraints:

// 1 <= answers.length <= 1000
// 0 <= answers[i] < 1000

var numRabbits = function (answers) {
  let countMap = new Map();
  let result = 0;

  // Count frequency of each answer
  for (let ans of answers) {
    countMap.set(ans, (countMap.get(ans) || 0) + 1);
  }

  for (let [k, freq] of countMap.entries()) {
    let groupSize = k + 1;
    let groupsNeeded = Math.ceil(freq / groupSize);
    result += groupsNeeded * groupSize;
  }

  return result;
};
console.log(numRabbits([1, 1, 2])); // Output: 5
console.log(numRabbits([10, 10, 10])); // Output: 11
console.log(numRabbits([0, 0, 1, 1, 1])); // Output: 6
