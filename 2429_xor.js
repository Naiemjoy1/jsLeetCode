// Given two positive integers num1 and num2, find the positive integer x such that:

// x has the same number of set bits as num2, and
// The value x XOR num1 is minimal.
// Note that XOR is the bitwise XOR operation.

// Return the integer x. The test cases are generated such that x is uniquely determined.

// The number of set bits of an integer is the number of 1's in its binary representation.

 

// Example 1:

// Input: num1 = 3, num2 = 5
// Output: 3
// Explanation:
// The binary representations of num1 and num2 are 0011 and 0101, respectively.
// The integer 3 has the same number of set bits as num2, and the value 3 XOR 3 = 0 is minimal.
// Example 2:

// Input: num1 = 1, num2 = 12
// Output: 3
// Explanation:
// The binary representations of num1 and num2 are 0001 and 1100, respectively.
// The integer 3 has the same number of set bits as num2, and the value 3 XOR 1 = 2 is minimal.
 

// Constraints:

// 1 <= num1, num2 <= 109

var minimizeXor = function(num1, num2) {
    // Function to count set bits in a number
    const countSetBits = (n) => n.toString(2).split('1').length - 1;

    // Number of set bits in num2
    const setBitsNum2 = countSetBits(num2);
    let setBitsRemaining = setBitsNum2;

    let x = 0;

    // Traverse from the most significant bit (MSB) to the least significant bit (LSB)
    for (let i = 31; i >= 0; i--) {
        const bitMask = 1 << i;
        // If the current bit in num1 is set and we still need more set bits in x
        if ((num1 & bitMask) !== 0 && setBitsRemaining > 0) {
            x |= bitMask; // Set the bit in x
            setBitsRemaining--;
        }
    }

    // If there are still set bits needed, set them starting from the least significant bit (LSB)
    for (let i = 0; i <= 31 && setBitsRemaining > 0; i++) {
        const bitMask = 1 << i;
        if ((x & bitMask) === 0) { // If the bit is not already set
            x |= bitMask; // Set the bit in x
            setBitsRemaining--;
        }
    }

    return x;
};

// Example usage:
console.log(minimizeXor(3, 5)); // Output: 3
console.log(minimizeXor(1, 12)); // Output: 3
