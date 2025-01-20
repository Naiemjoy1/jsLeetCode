// Given an m x n integer matrix heightMap representing the height of each unit cell in a 2D elevation map, return the volume of water it can trap after raining.

 

// Example 1:


// Input: heightMap = [[1,4,3,1,3,2],[3,2,1,3,2,4],[2,3,3,2,3,1]]
// Output: 4
// Explanation: After the rain, water is trapped between the blocks.
// We have two small ponds 1 and 3 units trapped.
// The total volume of water trapped is 4.
// Example 2:


// Input: heightMap = [[3,3,3,3,3],[3,2,2,2,3],[3,2,1,2,3],[3,2,2,2,3],[3,3,3,3,3]]
// Output: 10
 

// Constraints:

// m == heightMap.length
// n == heightMap[i].length
// 1 <= m, n <= 200
// 0 <= heightMap[i][j] <= 2 * 104

var trapRainWater = function(heightMap) {
    if (!heightMap || heightMap.length < 3 || heightMap[0].length < 3) return 0;

    const m = heightMap.length;
    const n = heightMap[0].length;
    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    const minHeap = new MinHeap(); // Priority queue to hold boundary cells

    // Add all boundary cells to the heap
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 || j === 0 || i === m - 1 || j === n - 1) {
                minHeap.insert({ x: i, y: j, height: heightMap[i][j] });
                visited[i][j] = true;
            }
        }
    }

    const directions = [
        [0, 1], [1, 0], [0, -1], [-1, 0] // Right, Down, Left, Up
    ];

    let waterTrapped = 0;

    while (!minHeap.isEmpty()) {
        const { x, y, height } = minHeap.extractMin();

        for (const [dx, dy] of directions) {
            const nx = x + dx;
            const ny = y + dy;

            if (nx >= 0 && nx < m && ny >= 0 && ny < n && !visited[nx][ny]) {
                visited[nx][ny] = true;
                waterTrapped += Math.max(0, height - heightMap[nx][ny]);
                minHeap.insert({
                    x: nx,
                    y: ny,
                    height: Math.max(height, heightMap[nx][ny])
                });
            }
        }
    }

    return waterTrapped;
};

// MinHeap implementation
class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(cell) {
        this.heap.push(cell);
        this._bubbleUp(this.heap.length - 1);
    }

    extractMin() {
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this._sinkDown(0);

        return min;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    _bubbleUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].height >= this.heap[parentIndex].height) break;

            [this.heap[index], this.heap[parentIndex]] = [
                this.heap[parentIndex], this.heap[index]
            ];

            index = parentIndex;
        }
    }

    _sinkDown(index) {
        const length = this.heap.length;
        const element = this.heap[index];

        while (true) {
            let leftChildIndex = 2 * index + 1;
            let rightChildIndex = 2 * index + 2;
            let smallest = index;

            if (
                leftChildIndex < length &&
                this.heap[leftChildIndex].height < this.heap[smallest].height
            ) {
                smallest = leftChildIndex;
            }

            if (
                rightChildIndex < length &&
                this.heap[rightChildIndex].height < this.heap[smallest].height
            ) {
                smallest = rightChildIndex;
            }

            if (smallest === index) break;

            [this.heap[index], this.heap[smallest]] = [
                this.heap[smallest], this.heap[index]
            ];

            index = smallest;
        }
    }
}