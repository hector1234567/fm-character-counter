const textContainer = document.getElementById("text-container");
const formErrorMessage = document.querySelector(".form__error-message");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const sentenceCount = document.getElementById("sentence-count");
const checkExcludeSpaces = document.getElementById("exclude-spaces");
const checkCharLimit = document.getElementById("check-char-limit");
const inputMaxWords = document.getElementById("max-words");
const timeMessage = document.querySelector(".form__time-message");

function init() {
  textContainer.addEventListener("input", handleTextInput);
  checkExcludeSpaces.addEventListener("change", handleTextInput);
  checkCharLimit.addEventListener("change", handleSetLimitChars);
  inputMaxWords.addEventListener("focusout", handleChangeCharsLimit);
}
init();

function handleTextInput() {
  const text = textContainer.value;
  charCount.innerText = numberOfChars(text);
  wordCount.innerText = numberOfWords(text);
  sentenceCount.innerText = numberOfSentences(text);
}

function numberOfChars(text) {
  if (checkExcludeSpaces.checked) {
    return text.replace(/\s/g, "").length;
  }
  return text.length;
}

function numberOfWords(text) {
  const words = (text.match(/\b\w+\b/g) || []).length;
  setMinutesOfReadingByWords(words);
  return words;
}

function numberOfSentences(text) {
  const sentences = text.match(/[^.!?]+[.!?]/g);
  return sentences ? sentences.length : 0;
}

function handleSetLimitChars() {
  if (checkCharLimit.checked) {
    inputMaxWords.focus();
    textContainer.setAttribute("maxlength", inputMaxWords.value);
  } else {
    textContainer.removeAttribute("maxlength");
  }
}

function handleChangeCharsLimit() {
  textContainer.setAttribute("maxlength", inputMaxWords.value);
  formErrorMessage.innerHTML = `&#9432; Limit reached! Your text exceeds ${Number(
    inputMaxWords.value
  )} characters.`;
}

function setMinutesOfReadingByWords(words) {
  timeMessage.innerText = `Approx. reading time: ${Math.floor(
    words / 400
  )} minutes`;
}
