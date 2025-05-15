const textContainer = document.getElementById("text-container");

const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const sentenceCount = document.getElementById("sentence-count");

const checkExcludeSpaces = document.getElementById("exclude-spaces");

function init() {
  textContainer.addEventListener("input", handleTextInput);
  checkExcludeSpaces.addEventListener("change", handleTextInput);
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
  return (text.match(/\b\w+\b/g) || []).length;
}

function numberOfSentences(text) {
  const sentences = text.match(/[^.!?]+[.!?]/g);
  return sentences ? sentences.length : 0;
}
