// Given a binary tree root, a node X in the tree is named good if in the path from root to X there are no nodes with a value greater than X.

// Return the number of good nodes in the binary tree.

// Example 1:

// Input: root = [3,1,4,3,null,1,5]
// Output: 4
// Explanation: Nodes in blue are good.
// Root Node (3) is always a good node.
// Node 4 -> (3,4) is the maximum value in the path starting from the root.
// Node 5 -> (3,4,5) is the maximum value in the path
// Node 3 -> (3,1,3) is the maximum value in the path.
// Example 2:

// Input: root = [3,3,null,4,2]
// Output: 3
// Explanation: Node 2 -> (3, 3, 2) is not good, because "3" is higher than it.
// Example 3:

// Input: root = [1]
// Output: 1
// Explanation: Root is considered as good.

// Constraints:

// The number of nodes in the binary tree is in the range [1, 10^5].
// Each node's value is between [-10^4, 10^4].

var goodNodes = function (root) {
  let count = 0;

  const dfs = (node, maxSoFar) => {
    if (!node) return;

    if (node.val >= maxSoFar) {
      count++;
    }

    const newMax = Math.max(maxSoFar, node.val);

    dfs(node.left, newMax);
    dfs(node.right, newMax);
  };

  dfs(root, root.val);

  return count;
};

const root1 = {
  val: 3,
  left: {
    val: 1,
    left: { val: 3, left: null, right: null },
    right: null,
  },
  right: {
    val: 4,
    left: { val: 1, left: null, right: null },
    right: { val: 5, left: null, right: null },
  },
};
console.log(goodNodes(root1));

const root2 = {
  val: 3,
  left: {
    val: 3,
    left: { val: 4, left: null, right: null },
    right: { val: 2, left: null, right: null },
  },
  right: null,
};
console.log(goodNodes(root2));

const root3 = { val: 1, left: null, right: null };
console.log(goodNodes(root3));
