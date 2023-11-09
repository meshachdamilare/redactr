

const redactrBtn = document.getElementById("btn-submit")
const resetBtn = document.getElementById("refresh-btn")
const totalWordScanned = document.getElementById("total-word")
const totalRedactedWord = document.getElementById("total-word-match")
const totalRedactedCharacter = document.getElementById("total-redacted-character")
const timeTaken = document.getElementById("time-taken")
const redactedText = document.getElementById("redacted-text")

redactrBtn.addEventListener("click", (e)=>{
    const comment = document.getElementById("text")
    const wordToRedact = document.getElementById("words-to-scamble")
    const redactCharacter = document.getElementById("scramble-replacement")

  
    e.preventDefault()

    if (!wordToRedact){
        alert("Provide word(s) to redact")
        return
    }
    var startTime = performance.now();
    let result = redactr(comment.value, wordToRedact.value, redactCharacter.value)
    var endTime = performance.now();

    var timeElapsedInSeconds = (endTime - startTime);
    totalWordScanned.textContent = result.totalWordsScanned
    totalRedactedWord.textContent =  result.totalWordRedacted
    totalRedactedCharacter.textContent = result.totalCharacterRedacted
    redactedText.textContent = result.redactedText
    timeTaken.textContent = timeElapsedInSeconds + " milliseconds"

 })

 resetBtn.addEventListener("click", function(e) {
    // Clear the input values
    textArea.value = "";
    wordsToScrambleInput.value = "";
    scrambleReplacementSelect.value = "*";

    // Clear the result elements
    redactedText.textContent = "";
    totalWord.textContent = "";
    totalWordMatch.textContent = "";
    totalRedactedCharacter.textContent = "";
    timeTaken.textContent = "";
});

function redactText(text, wordsToRedact, redactWith) {
    const wordToRedactArr = wordsToRedact.split(" ").map(word => word.toLowerCase());
    let totalWordsScanned = 0;
    let totalWordsRedacted = 0;
    let totalCharactersRedacted = 0;

    // Helper function to redact words
    function redactWord(word) {
        totalWordsRedacted++;
        totalCharactersRedacted += word.length;
        let newWord = redactWith.repeat(word.length);
        return newWord;
    }

    // Split text into words while preserving non-alphabetical characters
    const wordSplitRegex = /(\W+)/;
    const textWordsArr = text.split(wordSplitRegex);

    const redactedText = textWordsArr.map(word => {
        totalWordsScanned++;
        if (/\w+/.test(word)) {
            // If the word contains at least one alphabet character
            const cleanWord = word.replace(/\W/g, "");
            if (wordToRedactArr.includes(cleanWord.toLowerCase())) {
                return redactWord(cleanWord);
            }
        }
        return word;
    }).join('');

    const resultObj = {
        "redactedText": redactedText,
        "totalWordsScanned": totalWordsScanned,
        "totalWordsRedacted": totalWordsRedacted,
        "totalCharactersRedacted": totalCharactersRedacted
    };

    return resultObj;
}
