// Given an object or array obj, return a compact object.

// A compact object is the same as the original object, except with keys containing falsy values removed. This operation applies to the object and any nested objects. Arrays are considered objects where the indices are keys. A value is considered falsy when Boolean(value) returns false.

// You may assume the obj is the output of JSON.parse. In other words, it is valid JSON.

 

// Example 1:

// Input: obj = [null, 0, false, 1]
// Output: [1]
// Explanation: All falsy values have been removed from the array.
// Example 2:

// Input: obj = {"a": null, "b": [false, 1]}
// Output: {"b": [1]}
// Explanation: obj["a"] and obj["b"][0] had falsy values and were removed.
// Example 3:

// Input: obj = [null, 0, 5, [0], [false, 16]]
// Output: [5, [], [16]]
// Explanation: obj[0], obj[1], obj[3][0], and obj[4][0] were falsy and removed.
 

// Constraints:

// obj is a valid JSON object
// 2 <= JSON.stringify(obj).length <= 106

var compactObject = function(obj) {
    if (Array.isArray(obj)) {
        // Recursively filter the array, removing falsy values
        return obj
            .map(compactObject) // Apply compactObject on each element
            .filter(Boolean); // Remove falsy values
    } else if (typeof obj === 'object' && obj !== null) {
        // Recursively process each key-value pair in the object
        const result = {};
        for (const key in obj) {
            const value = compactObject(obj[key]);
            if (Boolean(value)) {
                result[key] = value;
            }
        }
        return result;
    } else {
        // If it's not an array or object, return the value itself
        return obj;
    }
};
const obj1 = [null, 0, false, 1];
console.log(compactObject(obj1)); // Output: [1]

const obj2 = {"a": null, "b": [false, 1]};
console.log(compactObject(obj2)); // Output: {"b": [1]}

const obj3 = [null, 0, 5, [0], [false, 16]];
console.log(compactObject(obj3)); // Output: [5, [], [16]]
