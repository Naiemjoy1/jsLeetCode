// Given an integer array nums and an integer k, return the kth largest element in the array.

// Note that it is the kth largest element in the sorted order, not the kth distinct element.

// Can you solve it without sorting?

// Example 1:

// Input: nums = [3,2,1,5,6,4], k = 2
// Output: 5
// Example 2:

// Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
// Output: 4

// Constraints:

// 1 <= k <= nums.length <= 105
// -104 <= nums[i] <= 104

var findKthLargest = function (nums, k) {
  // Min-Heap utility functions
  const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const heapifyUp = (heap) => {
    let index = heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (heap[parentIndex] > heap[index]) {
        swap(heap, parentIndex, index);
        index = parentIndex;
      } else {
        break;
      }
    }
  };

  const heapifyDown = (heap) => {
    let index = 0;
    while (index < heap.length) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let smallest = index;

      if (
        leftChildIndex < heap.length &&
        heap[leftChildIndex] < heap[smallest]
      ) {
        smallest = leftChildIndex;
      }

      if (
        rightChildIndex < heap.length &&
        heap[rightChildIndex] < heap[smallest]
      ) {
        smallest = rightChildIndex;
      }

      if (smallest !== index) {
        swap(heap, index, smallest);
        index = smallest;
      } else {
        break;
      }
    }
  };

  // Min-Heap implementation
  const minHeap = [];
  for (let num of nums) {
    minHeap.push(num);
    heapifyUp(minHeap);
    if (minHeap.length > k) {
      minHeap[0] = minHeap.pop(); // Replace root with last element
      heapifyDown(minHeap); // Restore heap property
    }
  }

  // The root of the heap is the kth largest element
  return minHeap[0];
};

// Example usage:
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // Output: 5
console.log(findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // Output: 4
