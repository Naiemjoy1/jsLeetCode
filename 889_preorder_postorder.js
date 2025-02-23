// Given two integer arrays, preorder and postorder where preorder is the preorder traversal of a binary tree of distinct values and postorder is the postorder traversal of the same tree, reconstruct and return the binary tree.

// If there exist multiple answers, you can return any of them.

// Example 1:

// Input: preorder = [1,2,4,5,3,6,7], postorder = [4,5,2,6,7,3,1]
// Output: [1,2,3,4,5,6,7]
// Example 2:

// Input: preorder = [1], postorder = [1]
// Output: [1]

// Constraints:

// 1 <= preorder.length <= 30
// 1 <= preorder[i] <= preorder.length
// All the values of preorder are unique.
// postorder.length == preorder.length
// 1 <= postorder[i] <= postorder.length
// All the values of postorder are unique.
// It is guaranteed that preorder and postorder are the preorder traversal and postorder traversal of the same binary tree.

var constructFromPrePost = function (preorder, postorder) {
  if (!preorder.length || !postorder.length) return null;

  let root = new TreeNode(preorder[0]);
  if (preorder.length === 1) return root;

  let leftSubtreeRoot = preorder[1];
  let leftSubtreeSize = postorder.indexOf(leftSubtreeRoot) + 1;

  root.left = constructFromPrePost(
    preorder.slice(1, leftSubtreeSize + 1),
    postorder.slice(0, leftSubtreeSize)
  );
  root.right = constructFromPrePost(
    preorder.slice(leftSubtreeSize + 1),
    postorder.slice(leftSubtreeSize, -1)
  );

  return root;
};
