import { CharDensityTable } from "./charDensityTable.js";

const textContainer = document.getElementById("text-container");
const formErrorMessage = document.querySelector(".form__error-message");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const sentenceCount = document.getElementById("sentence-count");
const checkExcludeSpaces = document.getElementById("exclude-spaces");
const checkCharLimit = document.getElementById("check-char-limit");
const inputMaxWords = document.getElementById("max-words");
const timeMessage = document.querySelector(".form__time-message");
const densityDiv = document.querySelector(".density");
const charDensityTable = new CharDensityTable(densityDiv);

function init() {
  textContainer.addEventListener("input", handleTextInput);
  checkExcludeSpaces.addEventListener("change", handleTextInput);
  checkCharLimit.addEventListener("change", handleSetLimitChars);
  inputMaxWords.addEventListener("focusout", handleChangeCharsLimit);

  charDensityTable.render();

  presetPreferedColorScheme();
}
init();

function presetPreferedColorScheme() {
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  document.getElementById("theme-checkbox").checked = prefersDarkMode;
}

function handleTextInput() {
  const text = textContainer.value;
  charCount.innerText = formatTwoDigits(numberOfChars(text));
  wordCount.innerText = formatTwoDigits(numberOfWords(text));
  sentenceCount.innerText = formatTwoDigits(numberOfSentences(text));

  charDensityTable.render(analizeString(text));
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

function formatTwoDigits(num) {
  return num < 10 ? "0" + num : num;
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

function analizeString(string) {
  const charsObj = {};
  for (let char of string.toUpperCase()) {
    if (!charsObj.hasOwnProperty(char)) {
      charsObj[char] = 1;
    } else {
      charsObj[char] += 1;
    }
  }
  return charsObj;
}
