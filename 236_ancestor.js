// Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

// According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

 

// Example 1:


// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
// Output: 3
// Explanation: The LCA of nodes 5 and 1 is 3.
// Example 2:


// Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
// Output: 5
// Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.
// Example 3:

// Input: root = [1,2], p = 1, q = 2
// Output: 1
 

// Constraints:

// The number of nodes in the tree is in the range [2, 105].
// -109 <= Node.val <= 109
// All Node.val are unique.
// p != q
// p and q will exist in the tree.

var lowestCommonAncestor = function(root, p, q) {
    if (!root) return null; // Base case: reached the end of a branch
    if (root === p || root === q) return root; // Base case: found one of the nodes

    // Recursive search in left and right subtrees
    const left = lowestCommonAncestor(root.left, p, q);
    const right = lowestCommonAncestor(root.right, p, q);

    if (left && right) return root; // If both sides return non-null, current node is LCA
    return left || right; // Otherwise, return the non-null value
};
// Helper function to create a tree node
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

// Example 1
const root1 = new TreeNode(
    3,
    new TreeNode(5, new TreeNode(6), new TreeNode(2, new TreeNode(7), new TreeNode(4))),
    new TreeNode(1, new TreeNode(0), new TreeNode(8))
);
console.log(lowestCommonAncestor(root1, root1.left, root1.right).val); // Output: 3

// Example 2
console.log(lowestCommonAncestor(root1, root1.left, root1.left.right.right).val); // Output: 5

// Example 3
const root2 = new TreeNode(1, new TreeNode(2));
console.log(lowestCommonAncestor(root2, root2, root2.left).val); // Output: 1
