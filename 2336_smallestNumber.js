// You have a set which contains all positive integers [1, 2, 3, 4, 5, ...].

// Implement the SmallestInfiniteSet class:

// SmallestInfiniteSet() Initializes the SmallestInfiniteSet object to contain all positive integers.
// int popSmallest() Removes and returns the smallest integer contained in the infinite set.
// void addBack(int num) Adds a positive integer num back into the infinite set, if it is not already in the infinite set.

// Example 1:

// Input
// ["SmallestInfiniteSet", "addBack", "popSmallest", "popSmallest", "popSmallest", "addBack", "popSmallest", "popSmallest", "popSmallest"]
// [[], [2], [], [], [], [1], [], [], []]
// Output
// [null, null, 1, 2, 3, null, 1, 4, 5]

// Explanation
// SmallestInfiniteSet smallestInfiniteSet = new SmallestInfiniteSet();
// smallestInfiniteSet.addBack(2);    // 2 is already in the set, so no change is made.
// smallestInfiniteSet.popSmallest(); // return 1, since 1 is the smallest number, and remove it from the set.
// smallestInfiniteSet.popSmallest(); // return 2, and remove it from the set.
// smallestInfiniteSet.popSmallest(); // return 3, and remove it from the set.
// smallestInfiniteSet.addBack(1);    // 1 is added back to the set.
// smallestInfiniteSet.popSmallest(); // return 1, since 1 was added back to the set and
//                                    // is the smallest number, and remove it from the set.
// smallestInfiniteSet.popSmallest(); // return 4, and remove it from the set.
// smallestInfiniteSet.popSmallest(); // return 5, and remove it from the set.

// Constraints:

// 1 <= num <= 1000
// At most 1000 calls will be made in total to popSmallest and addBack.

class SmallestInfiniteSet {
  constructor() {
    // A set to keep track of added-back numbers.
    this.addedBackSet = new Set();
    // Variable to keep track of the smallest number not yet popped.
    this.currentSmallest = 1;
  }

  /**
   * Removes and returns the smallest integer from the infinite set.
   * @return {number}
   */
  popSmallest() {
    // If there are numbers in the added-back set, we need to remove and return the smallest.
    if (this.addedBackSet.size > 0) {
      const smallestInSet = Math.min(...this.addedBackSet);
      this.addedBackSet.delete(smallestInSet);
      return smallestInSet;
    }
    // Otherwise, return the current smallest number and increment the tracker.
    return this.currentSmallest++;
  }

  /**
   * Adds a positive integer num back to the infinite set.
   * @param {number} num
   * @return {void}
   */
  addBack(num) {
    // Only add back the number if it is less than the current smallest and not already in the set.
    if (num < this.currentSmallest) {
      this.addedBackSet.add(num);
    }
  }
}

/**
 * Example Usage:
 * var obj = new SmallestInfiniteSet();
 * obj.addBack(2);
 * console.log(obj.popSmallest()); // Outputs 1
 * console.log(obj.popSmallest()); // Outputs 2
 * console.log(obj.popSmallest()); // Outputs 3
 * obj.addBack(1);
 * console.log(obj.popSmallest()); // Outputs 1
 * console.log(obj.popSmallest()); // Outputs 4
 * console.log(obj.popSmallest()); // Outputs 5
 */
