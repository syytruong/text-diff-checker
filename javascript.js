var userInput = document.getElementById('user-input');
var modifiedInput = document.getElementById('modified-input');

const splitToSentences = (input) => {
    const re = /\s*(?:;|$)\s*/
    const sentences = input.split(re);
    return sentences;
  }

  const splitToWords = (input) => {
    const tokens = input.trim().split(/\s+/g);
    return tokens;
  }

  const isShortSentence = (input) => {
      if (input.length <= 2) {
          return true;
      }
      return false;
  }

  const handleShortSentence = (isShort, input) => {
    if (isShort) {
      const newArary = [];
      var element = input?.join(' ');
      newArary.push(element);
      return newArary;
    }
   return input;
  }

  const switchPosition = (array, currPosition) => {
    const nextIndex = currPosition + 1;
    const nextValue = array[nextIndex];
  
    array.splice(nextIndex, 1, array[currPosition]);
    array.splice(currPosition, 1, nextValue);
  }

  const handleStrings = (array1, array2) => {
    let length = (array1.length > array2.length) ? array1.length : array2.length;
    for (let i = 0; i < length; i++) {
      const next = i + 1;
      if (array1[i] === array2[i]) {
        highlightOnDiffIndex(array2[i], 'none');
      } else {
        if (array1[i] && array2[i]) {
          if (array1[i] === array2[next]) {
            if (array1[next] !== array2[next]) {
              if (array1[next] === array2[i]) {
                highlightOnDiffIndex(array2[i], 'green');
                switchPosition(array1, i);
              } else {
                highlightOnDiffIndex(array2[i], 'green');
                array1.splice(i, 0, '');
              }
            } else {
              highlightOnDiffIndex(array1[i], 'red');
              highlightOnDiffIndex(array2[i], 'green');
            }
          } else if (array2[i] === array1[next]) {
            if (array1[next] !== array2[next]) {
              highlightOnDiffIndex(array1[i], 'red');
              array2.splice(i, 0, '');
            } else {
              highlightOnDiffIndex(array1[i], 'red');
              highlightOnDiffIndex(array2[i], 'green');
            }
          } else {
            highlightOnDiffIndex(array1[i], 'red');
            highlightOnDiffIndex(array2[i], 'green');
          }
        } else {
          if (!array1[i] && array2[i]) {
            highlightOnDiffIndex(array2[i], 'green');
          } else if (array1[i] && !array2[i]) {
            highlightOnDiffIndex(array1[i], 'red');
          }
        }
      }
      length = (array1.length > array2.length) ? array1.length : array2.length;
    }
  }

  const result = (userInput, modifieldInput) => {
    const userSentences = userInput.replace(/\.\s+/g,'.|').replace(/\?\s/g,'?|').replace(/\!\s/g,'!|').split("|");
    const modifiedSentences = modifieldInput.replace(/\.\s+/g,'.|').replace(/\?\s/g,'?|').replace(/\!\s/g,'!|').split("|");

    for (let i = 0; i < userSentences.length || i < modifiedSentences.length; i++) {
      const userSentence = userSentences[i];
      const modifiedSentence = modifiedSentences[i];

      const userTokens = userSentence ? splitToWords(userSentence) : '';
      const modifiedTokens = modifiedSentence ? splitToWords(modifiedSentence) : '';

      const sortedUserTokens = handleShortSentence(isShortSentence(userTokens),userTokens);
      const sortedModifiedTokens = handleShortSentence(isShortSentence(modifiedTokens),modifiedTokens);

      handleStrings(sortedUserTokens, sortedModifiedTokens);
    }
  }

  function submit() {
    while (document.getElementById('display').childNodes.length > 0) {
        document.getElementById('display').removeChild(document.getElementById('display').lastChild);
    }
    const userInputValue = document.getElementById('user-input').value;
    const modifiedInputValue = document.getElementById('modified-input').value;

    result(userInputValue, modifiedInputValue);
  }

  function highlightOnDiffIndex(string, color) {
    const span = document.createElement('span');
    var text = "";
   
    if (color === 'none') {
      text +=" "+string+" ";
    } else {
      text +=` <span class='${color}'> `+string+"</span> ";
    }
    span.innerHTML = text;
    document.getElementById('display').appendChild(span);
  }