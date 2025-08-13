// The Tribonacci sequence Tn is defined as follows: 

// T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

// Given n, return the value of Tn.

 

// Example 1:

// Input: n = 4
// Output: 4
// Explanation:
// T_3 = 0 + 1 + 1 = 2
// T_4 = 1 + 1 + 2 = 4
// Example 2:

// Input: n = 25
// Output: 1389537
 

// Constraints:

// 0 <= n <= 37
// The answer is guaranteed to fit within a 32-bit integer, ie. answer <= 2^31 - 1.

var tribonacci = function(n) {
    // Base cases
    if (n === 0) return 0;
    if (n === 1 || n === 2) return 1;

    // Initialize the first three values of the sequence
    let t0 = 0, t1 = 1, t2 = 1;

    // Iterate to calculate the nth Tribonacci number
    for (let i = 3; i <= n; i++) {
        const t3 = t0 + t1 + t2; // Calculate the next Tribonacci number
        t0 = t1; // Update t0 to t1
        t1 = t2; // Update t1 to t2
        t2 = t3; // Update t2 to t3
    }

    return t2; // The nth Tribonacci number
};

// Example Usage
console.log(tribonacci(4));  // Output: 4
console.log(tribonacci(25)); // Output: 1389537
