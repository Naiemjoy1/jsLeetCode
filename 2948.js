// You are given a 0-indexed array of positive integers nums and a positive integer limit.

// In one operation, you can choose any two indices i and j and swap nums[i] and nums[j] if |nums[i] - nums[j]| <= limit.

// Return the lexicographically smallest array that can be obtained by performing the operation any number of times.

// An array a is lexicographically smaller than an array b if in the first position where a and b differ, array a has an element that is less than the corresponding element in b. For example, the array [2,10,3] is lexicographically smaller than the array [10,2,3] because they differ at index 0 and 2 < 10.

 

// Example 1:

// Input: nums = [1,5,3,9,8], limit = 2
// Output: [1,3,5,8,9]
// Explanation: Apply the operation 2 times:
// - Swap nums[1] with nums[2]. The array becomes [1,3,5,9,8]
// - Swap nums[3] with nums[4]. The array becomes [1,3,5,8,9]
// We cannot obtain a lexicographically smaller array by applying any more operations.
// Note that it may be possible to get the same result by doing different operations.
// Example 2:

// Input: nums = [1,7,6,18,2,1], limit = 3
// Output: [1,6,7,18,1,2]
// Explanation: Apply the operation 3 times:
// - Swap nums[1] with nums[2]. The array becomes [1,6,7,18,2,1]
// - Swap nums[0] with nums[4]. The array becomes [2,6,7,18,1,1]
// - Swap nums[0] with nums[5]. The array becomes [1,6,7,18,1,2]
// We cannot obtain a lexicographically smaller array by applying any more operations.
// Example 3:

// Input: nums = [1,7,28,19,10], limit = 3
// Output: [1,7,28,19,10]
// Explanation: [1,7,28,19,10] is the lexicographically smallest array we can obtain because we cannot apply the operation on any two indices.
 

// Constraints:

// 1 <= nums.length <= 105
// 1 <= nums[i] <= 109
// 1 <= limit <= 109

class UnionFind {
    constructor(size) {
        this.parent = Array(size).fill(0).map((_, i) => i);
        this.rank = Array(size).fill(1);
    }

    find(x) {
        if (this.parent[x] !== x) {
            this.parent[x] = this.find(this.parent[x]); // Path compression
        }
        return this.parent[x];
    }

    union(x, y) {
        const rootX = this.find(x);
        const rootY = this.find(y);

        if (rootX !== rootY) {
            if (this.rank[rootX] > this.rank[rootY]) {
                this.parent[rootY] = rootX;
            } else if (this.rank[rootX] < this.rank[rootY]) {
                this.parent[rootX] = rootY;
            } else {
                this.parent[rootY] = rootX;
                this.rank[rootX]++;
            }
        }
    }
}

var lexicographicallySmallestArray = function(nums, limit) {
    const n = nums.length;
    const uf = new UnionFind(n);

    // Create groups using union-find
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            if (Math.abs(nums[i] - nums[j]) <= limit) {
                uf.union(i, j);
            }
        }
    }

    // Group elements by their root
    const groups = {};
    for (let i = 0; i < n; i++) {
        const root = uf.find(i);
        if (!groups[root]) groups[root] = [];
        groups[root].push(i);
    }

    // Sort each group and place the smallest elements in the lowest indices
    for (const group of Object.values(groups)) {
        const sortedValues = group.map(index => nums[index]).sort((a, b) => a - b);
        group.sort((a, b) => a - b); // Sort indices to place values correctly
        for (let k = 0; k < group.length; k++) {
            nums[group[k]] = sortedValues[k];
        }
    }

    return nums;
};

// Example usage
console.log(lexicographicallySmallestArray([1, 5, 3, 9, 8], 2)); // Output: [1, 3, 5, 8, 9]
console.log(lexicographicallySmallestArray([1, 7, 6, 18, 2, 1], 3)); // Output: [1, 6, 7, 18, 1, 2]
console.log(lexicographicallySmallestArray([1, 7, 28, 19, 10], 3)); // Output: [1, 7, 28, 19, 10]
