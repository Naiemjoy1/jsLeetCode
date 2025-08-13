// You are given the head of a linked list. Delete the middle node, and return the head of the modified linked list.

// The middle node of a linked list of size n is the ⌊n / 2⌋th node from the start using 0-based indexing, where ⌊x⌋ denotes the largest integer less than or equal to x.

// For n = 1, 2, 3, 4, and 5, the middle nodes are 0, 1, 1, 2, and 2, respectively.
 

// Example 1:


// Input: head = [1,3,4,7,1,2,6]
// Output: [1,3,4,1,2,6]
// Explanation:
// The above figure represents the given linked list. The indices of the nodes are written below.
// Since n = 7, node 3 with value 7 is the middle node, which is marked in red.
// We return the new list after removing this node. 
// Example 2:


// Input: head = [1,2,3,4]
// Output: [1,2,4]
// Explanation:
// The above figure represents the given linked list.
// For n = 4, node 2 with value 3 is the middle node, which is marked in red.
// Example 3:


// Input: head = [2,1]
// Output: [2]
// Explanation:
// The above figure represents the given linked list.
// For n = 2, node 1 with value 1 is the middle node, which is marked in red.
// Node 0 with value 2 is the only node remaining after removing node 1.
 

// Constraints:

// The number of nodes in the list is in the range [1, 105].
// 1 <= Node.val <= 105

// Function to delete the middle node of a linked list
var deleteMiddle = function(head) {
    // If there's only one node, return null
    if (!head || !head.next) return null;

    let slow = head, fast = head;
    let prev = null; // To track the node before the middle node

    // Traverse the list to find the middle node
    while (fast && fast.next) {
        prev = slow; // Keep track of the node before slow
        slow = slow.next; // Move slow one step
        fast = fast.next.next; // Move fast two steps
    }

    // Remove the middle node
    if (prev) prev.next = slow.next;

    return head;
};

// Helper function to create a linked list from an array
function createLinkedList(arr) {
    let dummy = { next: null };
    let current = dummy;
    for (let val of arr) {
        current.next = { val, next: null };
        current = current.next;
    }
    return dummy.next;
}

// Helper function to convert a linked list to an array
function linkedListToArray(head) {
    let result = [];
    while (head) {
        result.push(head.val);
        head = head.next;
    }
    return result;
}

// Example Usage
let head;

// Test Case 1
head = createLinkedList([1, 3, 4, 7, 1, 2, 6]);
head = deleteMiddle(head);
console.log(linkedListToArray(head)); // Output: [1, 3, 4, 1, 2, 6]

// Test Case 2
head = createLinkedList([1, 2, 3, 4]);
head = deleteMiddle(head);
console.log(linkedListToArray(head)); // Output: [1, 2, 4]

// Test Case 3
head = createLinkedList([2, 1]);
head = deleteMiddle(head);
console.log(linkedListToArray(head)); // Output: [2]

// Test Case 4 (Single Node)
head = createLinkedList([10]);
head = deleteMiddle(head);
console.log(linkedListToArray(head)); // Output: []

// Test Case 5 (Empty List)
head = createLinkedList([]);
head = deleteMiddle(head);
console.log(linkedListToArray(head)); // Output: []
