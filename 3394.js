// You are given an integer n representing the dimensions of an n x n grid, with the origin at the bottom-left corner of the grid. You are also given a 2D array of coordinates rectangles, where rectangles[i] is in the form [startx, starty, endx, endy], representing a rectangle on the grid. Each rectangle is defined as follows:

// (startx, starty): The bottom-left corner of the rectangle.
// (endx, endy): The top-right corner of the rectangle.
// Note that the rectangles do not overlap. Your task is to determine if it is possible to make either two horizontal or two vertical cuts on the grid such that:

// Each of the three resulting sections formed by the cuts contains at least one rectangle.
// Every rectangle belongs to exactly one section.
// Return true if such cuts can be made; otherwise, return false.

// Example 1:

// Input: n = 5, rectangles = [[1,0,5,2],[0,2,2,4],[3,2,5,3],[0,4,4,5]]

// Output: true

// Explanation:

// The grid is shown in the diagram. We can make horizontal cuts at y = 2 and y = 4. Hence, output is true.

// Example 2:

// Input: n = 4, rectangles = [[0,0,1,1],[2,0,3,4],[0,2,2,3],[3,0,4,3]]

// Output: true

// Explanation:

// We can make vertical cuts at x = 2 and x = 3. Hence, output is true.

// Example 3:

// Input: n = 4, rectangles = [[0,2,2,4],[1,0,3,2],[2,2,3,4],[3,0,4,2],[3,2,4,4]]

// Output: false

// Explanation:

// We cannot make two horizontal or two vertical cuts that satisfy the conditions. Hence, output is false.

// Constraints:

// 3 <= n <= 109
// 3 <= rectangles.length <= 105
// 0 <= rectangles[i][0] < rectangles[i][2] <= n
// 0 <= rectangles[i][1] < rectangles[i][3] <= n
// No two rectangles overlap.

var checkValidCuts = function (n, rectangles) {
  // Collect all unique y-values for horizontal cuts and x-values for vertical cuts
  const horizontalCuts = new Set();
  const verticalCuts = new Set();

  // Process each rectangle and collect the relevant values
  for (let [startx, starty, endx, endy] of rectangles) {
    horizontalCuts.add(starty);
    horizontalCuts.add(endy);
    verticalCuts.add(startx);
    verticalCuts.add(endx);
  }

  // Sort the cut values for easier processing
  const sortedHorizontalCuts = Array.from(horizontalCuts).sort((a, b) => a - b);
  const sortedVerticalCuts = Array.from(verticalCuts).sort((a, b) => a - b);

  // Check for possible horizontal cuts (y-values)
  if (sortedHorizontalCuts.length >= 3) {
    for (let i = 0; i < sortedHorizontalCuts.length - 2; i++) {
      const cut1 = sortedHorizontalCuts[i];
      const cut2 = sortedHorizontalCuts[i + 1];
      const cut3 = sortedHorizontalCuts[i + 2];

      // Check if there are rectangles in each of the three sections
      const section1 = rectangles.filter(
        ([startx, starty, endx, endy]) => endy <= cut1
      );
      const section2 = rectangles.filter(
        ([startx, starty, endx, endy]) => starty >= cut2 && endy <= cut3
      );
      const section3 = rectangles.filter(
        ([startx, starty, endx, endy]) => starty >= cut3
      );

      if (section1.length > 0 && section2.length > 0 && section3.length > 0) {
        return true;
      }
    }
  }

  // Check for possible vertical cuts (x-values)
  if (sortedVerticalCuts.length >= 3) {
    for (let i = 0; i < sortedVerticalCuts.length - 2; i++) {
      const cut1 = sortedVerticalCuts[i];
      const cut2 = sortedVerticalCuts[i + 1];
      const cut3 = sortedVerticalCuts[i + 2];

      // Check if there are rectangles in each of the three sections
      const section1 = rectangles.filter(
        ([startx, starty, endx, endy]) => endx <= cut1
      );
      const section2 = rectangles.filter(
        ([startx, starty, endx, endy]) => startx >= cut2 && endx <= cut3
      );
      const section3 = rectangles.filter(
        ([startx, starty, endx, endy]) => startx >= cut3
      );

      if (section1.length > 0 && section2.length > 0 && section3.length > 0) {
        return true;
      }
    }
  }

  return false;
};
