// Given a string s, reverse only all the vowels in the string and return it.

// The vowels are 'a', 'e', 'i', 'o', and 'u', and they can appear in both lower and upper cases, more than once.

// Example 1:

// Input: s = "IceCreAm"

// Output: "AceCreIm"

// Explanation:

// The vowels in s are ['I', 'e', 'e', 'A']. On reversing the vowels, s becomes "AceCreIm".

// Example 2:

// Input: s = "leetcode"

// Output: "leotcede"

// Constraints:

// 1 <= s.length <= 3 * 105
// s consist of printable ASCII characters.

function reverseVowels(s) {
  const vowels = new Set(["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]);

  let strArr = s.split("");

  let i = 0;
  let j = strArr.length - 1;

  while (i < j) {
    while (i < j && !vowels.has(strArr[i])) {
      i++;
    }
    while (i < j && !vowels.has(strArr[j])) {
      j--;
    }
    if (i < j) {
      [strArr[i], strArr[j]] = [strArr[j], strArr[i]];
      i++;
      j--;
    }
  }

  return strArr.join("");
}

console.log(reverseVowels("IceCreAm"));
console.log(reverseVowels("leetcode"));
