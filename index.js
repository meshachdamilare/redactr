

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

function redactr(text, wordsToRedactr, redactWith) {
    const wordToRedactrArr = wordsToRedactr.split(" ").map(word => word.toLowerCase());
    let totalWordsScanned = 0
    let totalWordRedacted = 0
    let totalCharacterRedacted = 0
    
    // helper function to redact words
    function redactWord(word) {
        totalWordRedacted ++
        totalCharacterRedacted += word.length
        let newWord = "";
        for (let i = 0; i < word.length; i++) {
            newWord += redactWith;
        }
        return newWord;
    }

    const textWordsArr = text.split(/\s+/);

    const redactedText = textWordsArr.map(word => {
        totalWordsScanned ++
        word = word.replace(/[^a-zA-Z]+/g, "");
        if (wordToRedactrArr.indexOf(word.toLowerCase()) > -1) {
            return redactWord(word);
        }
        return word;
    }).join(" ");

    const resultObj = {
        "redactedText":redactedText,
        "totalWordsScanned":totalWordsScanned,
        "totalWordRedacted":totalWordRedacted,
        "totalCharacterRedacted":totalCharacterRedacted
    }
    return resultObj
}
