// You are given two 0-indexed arrays nums1 and nums2 of length n, both of which are permutations of [0, 1, ..., n - 1].

// A good triplet is a set of 3 distinct values which are present in increasing order by position both in nums1 and nums2. In other words, if we consider pos1v as the index of the value v in nums1 and pos2v as the index of the value v in nums2, then a good triplet will be a set (x, y, z) where 0 <= x, y, z <= n - 1, such that pos1x < pos1y < pos1z and pos2x < pos2y < pos2z.

// Return the total number of good triplets.

// Example 1:

// Input: nums1 = [2,0,1,3], nums2 = [0,1,2,3]
// Output: 1
// Explanation:
// There are 4 triplets (x,y,z) such that pos1x < pos1y < pos1z. They are (2,0,1), (2,0,3), (2,1,3), and (0,1,3).
// Out of those triplets, only the triplet (0,1,3) satisfies pos2x < pos2y < pos2z. Hence, there is only 1 good triplet.
// Example 2:

// Input: nums1 = [4,0,1,3,2], nums2 = [4,1,0,2,3]
// Output: 4
// Explanation: The 4 good triplets are (4,0,3), (4,0,2), (4,1,3), and (4,1,2).

// Constraints:

// n == nums1.length == nums2.length
// 3 <= n <= 105
// 0 <= nums1[i], nums2[i] <= n - 1
// nums1 and nums2 are permutations of [0, 1, ..., n - 1].

class BIT {
  constructor(size) {
    this.tree = new Array(size + 2).fill(0);
    this.size = size + 2;
  }

  update(index, value) {
    index++;
    while (index < this.size) {
      this.tree[index] += value;
      index += index & -index;
    }
  }

  query(index) {
    index++;
    let result = 0;
    while (index > 0) {
      result += this.tree[index];
      index -= index & -index;
    }
    return result;
  }
}

var goodTriplets = function (nums1, nums2) {
  const n = nums1.length;

  // Map values to their indices in nums2
  const posInNums2 = new Array(n);
  for (let i = 0; i < n; i++) {
    posInNums2[nums2[i]] = i;
  }

  // Convert nums1 to its positions in nums2
  const transformed = nums1.map((val) => posInNums2[val]);

  // Count how many values before i are less than transformed[i]
  const leftBIT = new BIT(n);
  const leftCounts = new Array(n).fill(0);

  for (let i = 0; i < n; i++) {
    leftCounts[i] = leftBIT.query(transformed[i] - 1);
    leftBIT.update(transformed[i], 1);
  }

  // Count how many values after i are greater than transformed[i]
  const rightBIT = new BIT(n);
  const rightCounts = new Array(n).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    rightCounts[i] = rightBIT.query(n - 1) - rightBIT.query(transformed[i]);
    rightBIT.update(transformed[i], 1);
  }

  // For each index i, compute good triplets with i as the middle value
  let result = 0;
  for (let i = 0; i < n; i++) {
    result += leftCounts[i] * rightCounts[i];
  }

  return result;
};
console.log(goodTriplets([2, 0, 1, 3], [0, 1, 2, 3])); // Output: 1
console.log(goodTriplets([4, 0, 1, 3, 2], [4, 1, 0, 2, 3])); // Output: 4
