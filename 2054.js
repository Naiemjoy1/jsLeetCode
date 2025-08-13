// You are given a 0-indexed 2D integer array of events where events[i] = [startTimei, endTimei, valuei]. The ith event starts at startTimei and ends at endTimei, and if you attend this event, you will receive a value of valuei. You can choose at most two non-overlapping events to attend such that the sum of their values is maximized.

// Return this maximum sum.

// Note that the start time and end time is inclusive: that is, you cannot attend two events where one of them starts and the other ends at the same time. More specifically, if you attend an event with end time t, the next event must start at or after t + 1.

// Example 1:

// Input: events = [[1,3,2],[4,5,2],[2,4,3]]
// Output: 4
// Explanation: Choose the green events, 0 and 1 for a sum of 2 + 2 = 4.
// Example 2:

// Example 1 Diagram
// Input: events = [[1,3,2],[4,5,2],[1,5,5]]
// Output: 5
// Explanation: Choose event 2 for a sum of 5.
// Example 3:

// Input: events = [[1,5,3],[1,5,1],[6,6,5]]
// Output: 8
// Explanation: Choose events 0 and 2 for a sum of 3 + 5 = 8.

// Constraints:

// 2 <= events.length <= 105
// events[i].length == 3
// 1 <= startTimei <= endTimei <= 109
// 1 <= valuei <= 106

var maxTwoEvents = function (events) {
  events.sort((a, b) => a[1] - b[1]);

  let maxValues = [];
  let maxValueSoFar = 0;

  for (let i = 0; i < events.length; i++) {
    maxValueSoFar = Math.max(maxValueSoFar, events[i][2]);
    maxValues.push(maxValueSoFar);
  }

  const findLastNonOverlapping = (startTime) => {
    let left = 0,
      right = events.length - 1,
      index = -1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (events[mid][1] < startTime) {
        index = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return index;
  };

  let result = 0;
  for (let i = 0; i < events.length; i++) {
    const [startTime, endTime, value] = events[i];
    const lastIndex = findLastNonOverlapping(startTime);
    const maxNonOverlapping = lastIndex !== -1 ? maxValues[lastIndex] : 0;

    result = Math.max(result, value + maxNonOverlapping);
  }

  return result;
};

console.log(
  maxTwoEvents([
    [1, 3, 2],
    [4, 5, 2],
    [2, 4, 3],
  ])
);
console.log(
  maxTwoEvents([
    [1, 3, 2],
    [4, 5, 2],
    [1, 5, 5],
  ])
);
console.log(
  maxTwoEvents([
    [1, 5, 3],
    [1, 5, 1],
    [6, 6, 5],
  ])
);
