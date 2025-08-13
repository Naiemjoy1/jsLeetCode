// Given the root of a binary tree, the level of its root is 1, the level of its children is 2, and so on.

// Return the smallest level x such that the sum of all the values of nodes at level x is maximal.

 

// Example 1:


// Input: root = [1,7,0,7,-8,null,null]
// Output: 2
// Explanation: 
// Level 1 sum = 1.
// Level 2 sum = 7 + 0 = 7.
// Level 3 sum = 7 + -8 = -1.
// So we return the level with the maximum sum which is level 2.
// Example 2:

// Input: root = [989,null,10250,98693,-89388,null,null,null,-32127]
// Output: 2
 

// Constraints:

// The number of nodes in the tree is in the range [1, 104].
// -105 <= Node.val <= 105

var maxLevelSum = function(root) {
    if (!root) return 0;

    let maxSum = -Infinity; // Track the maximum sum
    let maxLevel = 0; // Track the level with the maximum sum
    let currentLevel = 1; // Start at level 1

    const queue = [root]; // BFS queue

    while (queue.length > 0) {
        const levelSize = queue.length;
        let levelSum = 0;

        // Process all nodes at the current level
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            levelSum += node.val;

            // Add children to the queue for the next level
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }

        // Update maxSum and maxLevel if needed
        if (levelSum > maxSum) {
            maxSum = levelSum;
            maxLevel = currentLevel;
        }

        currentLevel++; // Move to the next level
    }

    return maxLevel;
};
// Helper function to create a tree node
function TreeNode(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
}

// Example 1
const root1 = new TreeNode(
    1,
    new TreeNode(7, new TreeNode(7), new TreeNode(-8)),
    new TreeNode(0)
);
console.log(maxLevelSum(root1)); // Output: 2

// Example 2
const root2 = new TreeNode(
    989,
    null,
    new TreeNode(10250, new TreeNode(98693), new TreeNode(-89388, null, new TreeNode(-32127)))
);
console.log(maxLevelSum(root2)); // Output: 2
