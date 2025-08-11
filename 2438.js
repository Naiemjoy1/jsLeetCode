// Given a positive integer n, there exists a 0-indexed array called powers, composed of the minimum number of powers of 2 that sum to n. The array is sorted in non-decreasing order, and there is only one way to form the array.

// You are also given a 0-indexed 2D integer array queries, where queries[i] = [lefti, righti]. Each queries[i] represents a query where you have to find the product of all powers[j] with lefti <= j <= righti.

// Return an array answers, equal in length to queries, where answers[i] is the answer to the ith query. Since the answer to the ith query may be too large, each answers[i] should be returned modulo 109 + 7.

// Example 1:

// Input: n = 15, queries = [[0,1],[2,2],[0,3]]
// Output: [2,4,64]
// Explanation:
// For n = 15, powers = [1,2,4,8]. It can be shown that powers cannot be a smaller size.
// Answer to 1st query: powers[0] * powers[1] = 1 * 2 = 2.
// Answer to 2nd query: powers[2] = 4.
// Answer to 3rd query: powers[0] * powers[1] * powers[2] * powers[3] = 1 * 2 * 4 * 8 = 64.
// Each answer modulo 109 + 7 yields the same answer, so [2,4,64] is returned.
// Example 2:

// Input: n = 2, queries = [[0,0]]
// Output: [2]
// Explanation:
// For n = 2, powers = [2].
// The answer to the only query is powers[0] = 2. The answer modulo 109 + 7 is the same, so [2] is returned.

// Constraints:

// 1 <= n <= 109
// 1 <= queries.length <= 105
// 0 <= starti <= endi < powers.length

var productQueries = function (n, queries) {
  const MOD = 1e9 + 7;

  // Step 1: Build the `powers` array from binary representation
  const powers = [];
  let bit = 0;
  while (n > 0) {
    if (n & 1) {
      powers.push(1 << bit);
    }
    bit++;
    n >>= 1;
  }
  powers.sort((a, b) => a - b);

  // Step 2: Prefix product for quick range product queries
  const prefix = new Array(powers.length + 1).fill(1);
  for (let i = 0; i < powers.length; i++) {
    prefix[i + 1] = (prefix[i] * powers[i]) % MOD;
  }

  // Step 3: Answer each query
  const result = [];
  for (let [l, r] of queries) {
    const product = (prefix[r + 1] * modInverse(prefix[l], MOD)) % MOD;
    result.push(product);
  }

  return result;
};

// Function to calculate modular inverse using Fermat's little theorem
function modInverse(a, m) {
  return modPow(a, m - 2, m);
}

function modPow(base, exp, mod) {
  let result = 1;
  while (exp > 0) {
    if (exp % 2 === 1) {
      result = (result * base) % mod;
    }
    base = (base * base) % mod;
    exp = Math.floor(exp / 2);
  }
  return result;
}

// Example test cases
console.log(
  productQueries(15, [
    [0, 1],
    [2, 2],
    [0, 3],
  ])
); // [2, 4, 64]
console.log(productQueries(2, [[0, 0]])); // [2]
