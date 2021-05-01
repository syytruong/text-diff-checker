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

  const compareArrays = (userTokens, modifiedTokens) => {
      let resultWords = [];
        for (let i = 0; i < userTokens?.length || i < modifiedTokens?.length; i++) {
        const word = userTokens[i];
        const modifiedWord = modifiedTokens[i];
        const nextIndex = i + 1;
  
        if (word?.toLowerCase() !== modifiedWord?.toLowerCase()) {
          if (word && modifiedWord) {
              if (userTokens[i]?.toLowerCase() === modifiedTokens[nextIndex]?.toLowerCase()) {
                  resultWords.push(modifiedWord)
                  userTokens.splice(i, 0, word);
              } else if (modifiedTokens[i]?.toLowerCase() === userTokens[nextIndex]?.toLowerCase()) {
                  resultWords.push(word)
                  modifiedTokens.splice(i, 0, modifiedWord);
              } else {
                  resultWords.push(word);
                  resultWords.push(modifiedWord);
              }
          } else {
            if (!word && modifiedWord) {
              resultWords.push(modifiedWord);
            } else if (word && !modifiedWord) {
              resultWords.push(word);
            }
          }
        } else {
          resultWords.push(modifiedWord);
        }
      }
      return resultWords;
  }


  const comebineArrays = (userTokens, modifiedTokens) => {
    const sortedUserTokens = handleShortSentence(isShortSentence(userTokens),userTokens);
    const sortedModifiedTokens = handleShortSentence(isShortSentence(modifiedTokens),modifiedTokens);
    return resultWords = compareArrays(sortedUserTokens, sortedModifiedTokens);
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

      let userDiffSet = sortedUserTokens.filter(i => !sortedModifiedTokens.includes(i));
      let modifiedDiffSet = sortedModifiedTokens.filter(i => !sortedUserTokens.includes(i));

      let resultWords = [];
      resultWords = comebineArrays(userTokens, modifiedTokens);

      highlight(resultWords, userDiffSet, modifiedDiffSet);
    }
  }

  function submit() {
    while (document.getElementById('display').childNodes.length > 0) {
        document.getElementById('display').removeChild(document.getElementById('display').lastChild);
    }
    var userInputValue = document.getElementById('user-input').value;
    var modifiedInputValue = document.getElementById('modified-input').value;

    result(userInputValue, modifiedInputValue);
  }

  function highlight(finalArry, userInputDiffs, modifiedInputDiffs){
    const span = document.createElement('span');
    var text = "";
    for(var i=0; i<finalArry.length; i++){
      var isUserInputDiff = userInputDiffs.includes(finalArry[i]);
      var isModifiedInputDiff =modifiedInputDiffs.includes(finalArry[i]);
      if(isUserInputDiff){
        text +=" <span class='red'>"+finalArry[i]+"</span> ";
      } else if (isModifiedInputDiff) {
          text +=" <span class='green'>"+finalArry[i]+"</span> ";
      } else {
        text +=" "+finalArry[i]+" ";
      }
    }
    span.innerHTML = text;
    document.getElementById('display').appendChild(span);
  }