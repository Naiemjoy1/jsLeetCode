// We run a preorder depth-first search (DFS) on the root of a binary tree.

// At each node in this traversal, we output D dashes (where D is the depth of this node), then we output the value of this node.  If the depth of a node is D, the depth of its immediate child is D + 1.  The depth of the root node is 0.

// If a node has only one child, that child is guaranteed to be the left child.

// Given the output traversal of this traversal, recover the tree and return its root.

// Example 1:

// Input: traversal = "1-2--3--4-5--6--7"
// Output: [1,2,5,3,4,6,7]
// Example 2:

// Input: traversal = "1-2--3---4-5--6---7"
// Output: [1,2,5,3,null,6,null,4,null,7]
// Example 3:

// Input: traversal = "1-401--349---90--88"
// Output: [1,401,null,349,88,90]

// Constraints:

// The number of nodes in the original tree is in the range [1, 1000].
// 1 <= Node.val <= 109

var recoverFromPreorder = function (traversal) {
  let stack = [];
  let i = 0;

  while (i < traversal.length) {
    let depth = 0;
    while (i < traversal.length && traversal[i] === "-") {
      depth++;
      i++;
    }

    let value = 0;
    while (i < traversal.length && traversal[i] !== "-") {
      value = value * 10 + (traversal[i] - "0");
      i++;
    }

    let node = new TreeNode(value);

    if (depth === stack.length) {
      if (stack.length > 0) stack[stack.length - 1].left = node;
    } else {
      while (stack.length > depth) stack.pop();
      stack[stack.length - 1].right = node;
    }

    stack.push(node);
  }

  while (stack.length > 1) stack.pop();
  return stack[0];
};
