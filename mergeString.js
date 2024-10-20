var mergeAlternately = function (word1, word2) {
  let mergeString = "";
  let i = 0,
    j = 0;

  while (i < word1.length || j < word2.length) {
    if (i < word1.length) {
      mergeString += word1[i];
      i++;
    }
    if (j < word2.length) {
      mergeString += word2[j];
      j++;
    }
  }

  return mergeString;
};

console.log(mergeAlternately("ab", "pqrs"));
