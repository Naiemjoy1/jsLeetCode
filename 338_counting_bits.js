// iven an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.

 

// Example 1:

// Input: n = 2
// Output: [0,1,1]
// Explanation:
// 0 --> 0
// 1 --> 1
// 2 --> 10
// Example 2:

// Input: n = 5
// Output: [0,1,1,2,1,2]
// Explanation:
// 0 --> 0
// 1 --> 1
// 2 --> 10
// 3 --> 11
// 4 --> 100
// 5 --> 101
 

// Constraints:

// 0 <= n <= 105

var countBits = function(n) {
    // Initialize the result array with size n+1, all elements default to 0
    const ans = new Array(n + 1).fill(0);

    // Loop through each number from 1 to n
    for (let i = 1; i <= n; i++) {
        // Calculate the number of 1s by using the relation:
        // ans[i] = ans[i >> 1] + (i & 1)
        ans[i] = ans[i >> 1] + (i & 1);
    }

    return ans;
};

// Example Usage
console.log(countBits(2)); // Output: [0, 1, 1]
console.log(countBits(5)); // Output: [0, 1, 1, 2, 1, 2]
