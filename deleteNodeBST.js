// Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

// Basically, the deletion can be divided into two stages:

// Search for a node to remove.
// If the node is found, delete the node.

// Example 1:

// Input: root = [5,3,6,2,4,null,7], key = 3
// Output: [5,4,6,2,null,null,7]
// Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
// One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
// Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.

// Example 2:

// Input: root = [5,3,6,2,4,null,7], key = 0
// Output: [5,3,6,2,4,null,7]
// Explanation: The tree does not contain a node with value = 0.
// Example 3:

// Input: root = [], key = 0
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 104].
// -105 <= Node.val <= 105
// Each node has a unique value.
// root is a valid binary search tree.
// -105 <= key <= 105

var deleteNode = function (root, key) {
  if (!root) return null; // Base case: if root is null, return null

  // Step 1: Search for the node
  if (key < root.val) {
    // If key is smaller, go to the left subtree
    root.left = deleteNode(root.left, key);
  } else if (key > root.val) {
    // If key is larger, go to the right subtree
    root.right = deleteNode(root.right, key);
  } else {
    // Node found
    // Case 1: No child or only one child
    if (!root.left) return root.right; // Replace with right child
    if (!root.right) return root.left; // Replace with left child

    // Case 2: Two children
    // Find the in-order successor (smallest node in the right subtree)
    let successor = findMin(root.right);
    root.val = successor.val; // Replace value with successor's value
    // Delete the successor node from the right subtree
    root.right = deleteNode(root.right, successor.val);
  }

  return root; // Return the updated tree
};

// Helper function to find the minimum value node in a tree
function findMin(node) {
  while (node.left) {
    node = node.left;
  }
  return node;
}

const TreeNode = function (val, left = null, right = null) {
  this.val = val;
  this.left = left;
  this.right = right;
};

// Example Tree: [5,3,6,2,4,null,7]
const root = new TreeNode(
  5,
  new TreeNode(3, new TreeNode(2), new TreeNode(4)),
  new TreeNode(6, null, new TreeNode(7))
);

console.log(deleteNode(root, 3));
// Output: BST with root [5,4,6,2,null,null,7]
