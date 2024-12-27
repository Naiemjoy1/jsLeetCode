// Given an array of integers temperatures represents the daily temperatures, return an array answer such that answer[i] is the number of days you have to wait after the ith day to get a warmer temperature. If there is no future day for which this is possible, keep answer[i] == 0 instead.

// Example 1:

// Input: temperatures = [73,74,75,71,69,72,76,73]
// Output: [1,1,4,2,1,1,0,0]
// Example 2:

// Input: temperatures = [30,40,50,60]
// Output: [1,1,1,0]
// Example 3:

// Input: temperatures = [30,60,90]
// Output: [1,1,0]

// Constraints:

// 1 <= temperatures.length <= 105
// 30 <= temperatures[i] <= 100

var dailyTemperatures = function (temperatures) {
  let answer = new Array(temperatures.length).fill(0);
  let stack = []; // Stack to store indices of temperatures

  for (let i = 0; i < temperatures.length; i++) {
    // While the stack is not empty and the current temperature is greater than the temperature at the index stored at the top of the stack
    while (
      stack.length > 0 &&
      temperatures[i] > temperatures[stack[stack.length - 1]]
    ) {
      let prevIndex = stack.pop(); // Get the index of the previous day
      answer[prevIndex] = i - prevIndex; // Calculate the difference in days
    }
    stack.push(i); // Push the current index onto the stack
  }

  return answer;
};