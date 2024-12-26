// Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.

// The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).

// Example 1:

// Input: root = [10,5,-3,3,2,null,11,3,-2,null,1], targetSum = 8
// Output: 3
// Explanation: The paths that sum to 8 are shown.
// Example 2:

// Input: root = [5,4,8,11,null,13,4,7,2,null,null,5,1], targetSum = 22
// Output: 3

// Constraints:

// The number of nodes in the tree is in the range [0, 1000].
// -109 <= Node.val <= 109
// -1000 <= targetSum <= 1000

var pathSum = function (root, targetSum) {
  // Helper function to calculate paths with the given sum
  const dfs = (node, targetSum) => {
    if (!node) return 0;

    // Count paths starting at this node
    let count = 0;
    if (node.val === targetSum) count++;

    // Continue to check the left and right subtree
    count += dfs(node.left, targetSum - node.val);
    count += dfs(node.right, targetSum - node.val);

    return count;
  };

  if (!root) return 0;

  // Check paths starting at the root, and also in the left and right subtrees
  return (
    dfs(root, targetSum) +
    pathSum(root.left, targetSum) +
    pathSum(root.right, targetSum)
  );
};

// Example usage:
const root = {
  val: 10,
  left: {
    val: 5,
    left: {
      val: 3,
      left: { val: 3, left: null, right: null },
      right: { val: -2, left: null, right: null },
    },
    right: { val: 2, left: null, right: { val: 1, left: null, right: null } },
  },
  right: {
    val: -3,
    left: null,
    right: { val: 11, left: null, right: null },
  },
};
console.log(pathSum(root, 8)); // Output: 3
