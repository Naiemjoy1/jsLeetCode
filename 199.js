// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

// Example 1:

// Input: root = [1,2,3,null,5,null,4]
// Output: [1,3,4]
// Example 2:

// Input: root = [1,null,3]
// Output: [1,3]
// Example 3:

// Input: root = []
// Output: []

// Constraints:

// The number of nodes in the tree is in the range [0, 100].
// -100 <= Node.val <= 100

var rightSideView = function (root) {
  if (!root) return []; // If the tree is empty, return an empty array

  const result = [];
  const queue = [root]; // Initialize a queue for BFS

  while (queue.length > 0) {
    const levelSize = queue.length; // Number of nodes in the current level
    let rightmostValue = null;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      rightmostValue = node.val; // Update the rightmost value as we traverse

      // Add the left and right children to the queue if they exist
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // Push the rightmost value of the current level to the result
    result.push(rightmostValue);
  }

  return result;
};
