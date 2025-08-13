// Given the head of a singly linked list, reverse the list, and return the reversed list.

// Example 1:

// Input: head = [1,2,3,4,5]
// Output: [5,4,3,2,1]
// Example 2:

// Input: head = [1,2]
// Output: [2,1]
// Example 3:

// Input: head = []
// Output: []

// Constraints:

// The number of nodes in the list is the range [0, 5000].
// -5000 <= Node.val <= 5000

class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

var reverseList = function (head) {
  let prev = null;
  let current = head;

  while (current !== null) {
    let nextTemp = current.next;
    current.next = prev;
    prev = current;
    current = nextTemp;
  }

  return prev;
};

const createLinkedList = (values) => {
  let dummyHead = new ListNode(0);
  let current = dummyHead;
  for (const value of values) {
    current.next = new ListNode(value);
    current = current.next;
  }
  return dummyHead.next;
};

const printLinkedList = (head) => {
  let current = head;
  const values = [];
  while (current) {
    values.push(current.val);
    current = current.next;
  }
  console.log(`[${values.join(", ")}]`);
};

const head1 = createLinkedList([1, 2, 3, 4, 5]);
console.log("Original linked list 1:");
printLinkedList(head1);
const reversedHead1 = reverseList(head1);
console.log("Reversed linked list 1:");
printLinkedList(reversedHead1);

const head2 = createLinkedList([1, 2]);
console.log("Original linked list 2:");
printLinkedList(head2);
const reversedHead2 = reverseList(head2);
console.log("Reversed linked list 2:");
printLinkedList(reversedHead2);

const head3 = createLinkedList([]);
console.log("Original linked list 3:");
printLinkedList(head3);
const reversedHead3 = reverseList(head3);
console.log("Reversed linked list 3:");
printLinkedList(reversedHead3);
