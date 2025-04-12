// You are given two positive integers n and k.

// An integer x is called k-palindromic if:

// x is a palindrome.
// x is divisible by k.
// An integer is called good if its digits can be rearranged to form a k-palindromic integer. For example, for k = 2, 2020 can be rearranged to form the k-palindromic integer 2002, whereas 1010 cannot be rearranged to form a k-palindromic integer.

// Return the count of good integers containing n digits.

// Note that any integer must not have leading zeros, neither before nor after rearrangement. For example, 1010 cannot be rearranged to form 101.

// Example 1:

// Input: n = 3, k = 5

// Output: 27

// Explanation:

// Some of the good integers are:

// 551 because it can be rearranged to form 515.
// 525 because it is already k-palindromic.
// Example 2:

// Input: n = 1, k = 4

// Output: 2

// Explanation:

// The two good integers are 4 and 8.

// Example 3:

// Input: n = 5, k = 6

// Output: 2468

// Constraints:

// 1 <= n <= 10
// 1 <= k <= 9

var countGoodIntegers = function (n, k) {
  const resultSet = new Set();

  const isPalindrome = (str) => {
    let l = 0,
      r = str.length - 1;
    while (l < r) {
      if (str[l++] !== str[r--]) return false;
    }
    return true;
  };

  const generatePermutations = (digits, path, used, callback) => {
    if (path.length === digits.length) {
      if (path[0] !== "0") callback(path.join(""));
      return;
    }

    for (let i = 0; i < digits.length; i++) {
      if (used[i] || (i > 0 && digits[i] === digits[i - 1] && !used[i - 1]))
        continue;
      used[i] = true;
      path.push(digits[i]);
      generatePermutations(digits, path, used, callback);
      path.pop();
      used[i] = false;
    }
  };

  const start = Math.pow(10, n - 1);
  const end = Math.pow(10, n) - 1;

  for (let num = start; num <= end; num++) {
    const strNum = num.toString();
    const digits = strNum.split("").sort();

    const found = new Set();

    generatePermutations(
      digits,
      [],
      Array(digits.length).fill(false),
      (perm) => {
        if (found.has(perm)) return;
        found.add(perm);

        if (isPalindrome(perm)) {
          const val = parseInt(perm, 10);
          if (val % k === 0) {
            resultSet.add(num);
          }
        }
      }
    );
  }

  return resultSet.size;
};
console.log(countGoodIntegers(3, 5)); // Output: 27
console.log(countGoodIntegers(1, 4)); // Output: 2
console.log(countGoodIntegers(5, 6)); // Output: 2468
