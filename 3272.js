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

/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var countGoodIntegers = function (n, k) {
  const fac = factorial(n);
  let ans = 0;
  const vis = new Set();
  const base = Math.pow(10, Math.floor((n - 1) / 2));

  for (let i = base; i < base * 10; i++) {
    let s = String(i);
    const rev = reverseString(s);
    if (n % 2 === 1) {
      s += rev.substring(1);
    } else {
      s += rev;
    }

    if (parseInt(s, 10) % k !== 0) {
      continue;
    }

    const bs = Array.from(s).sort();
    const t = bs.join("");

    if (vis.has(t)) {
      continue;
    }

    vis.add(t);

    const cnt = Array(10).fill(0);
    for (const c of t) {
      cnt[parseInt(c, 10)]++;
    }

    let res = (n - cnt[0]) * fac[n - 1];
    for (const x of cnt) {
      res /= fac[x];
    }
    ans += res;
  }

  return ans;
};

function factorial(n) {
  const fac = Array(n + 1).fill(1);
  for (let i = 1; i <= n; i++) {
    fac[i] = fac[i - 1] * i;
  }
  return fac;
}

function reverseString(s) {
  return s.split("").reverse().join("");
}
console.log(countGoodIntegers(3, 5)); // Output: 27
console.log(countGoodIntegers(1, 4)); // Output: 2
console.log(countGoodIntegers(5, 6)); // Output: 2468
