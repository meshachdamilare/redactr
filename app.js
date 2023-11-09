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

const text = "Allow the user to specify what to use in replacing \nthe words so that the app can do the scrambling with what the user provides, be it asterisks, question marks, dashes, underscores, or even other words."
const wordsToRedact = "to the "
const redactWith = "*"

const res = redactText(text, wordsToRedact, redactWith)
console.log(res)