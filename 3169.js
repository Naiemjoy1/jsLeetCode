// You are given a positive integer days representing the total number of days an employee is available for work (starting from day 1). You are also given a 2D array meetings of size n where, meetings[i] = [start_i, end_i] represents the starting and ending days of meeting i (inclusive).

// Return the count of days when the employee is available for work but no meetings are scheduled.

// Note: The meetings may overlap.

// Example 1:

// Input: days = 10, meetings = [[5,7],[1,3],[9,10]]

// Output: 2

// Explanation:

// There is no meeting scheduled on the 4th and 8th days.

// Example 2:

// Input: days = 5, meetings = [[2,4],[1,3]]

// Output: 1

// Explanation:

// There is no meeting scheduled on the 5th day.

// Example 3:

// Input: days = 6, meetings = [[1,6]]

// Output: 0

// Explanation:

// Meetings are scheduled for all working days.

// Constraints:

// 1 <= days <= 109
// 1 <= meetings.length <= 105
// meetings[i].length == 2
// 1 <= meetings[i][0] <= meetings[i][1] <= days

var countDays = function (days, meetings) {
  // Step 1: Sort the meetings by their start time
  meetings.sort((a, b) => a[0] - b[0]);

  let mergedMeetings = [];

  // Step 2: Merge the overlapping meetings
  for (let meeting of meetings) {
    // If mergedMeetings is empty or the current meeting doesn't overlap with the last merged one
    if (
      mergedMeetings.length === 0 ||
      mergedMeetings[mergedMeetings.length - 1][1] < meeting[0]
    ) {
      mergedMeetings.push(meeting);
    } else {
      // Merge the current meeting with the last one
      mergedMeetings[mergedMeetings.length - 1][1] = Math.max(
        mergedMeetings[mergedMeetings.length - 1][1],
        meeting[1]
      );
    }
  }

  // Step 3: Calculate the total number of available days
  let unavailableDays = 0;

  for (let meeting of mergedMeetings) {
    unavailableDays += meeting[1] - meeting[0] + 1;
  }

  // The available days are the total days minus the days with meetings
  return days - unavailableDays;
};

// Example cases
console.log(
  countDays(10, [
    [5, 7],
    [1, 3],
    [9, 10],
  ])
); // Output: 2
console.log(
  countDays(5, [
    [2, 4],
    [1, 3],
  ])
); // Output: 1
console.log(countDays(6, [[1, 6]])); // Output: 0
