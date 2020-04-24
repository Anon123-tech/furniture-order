export default function capitalize(word) {
    if (!word) {
        throw new Error("Empty string/non-string passed in!");
    }
    return word.charAt(0).toLocaleUpperCase('ru-RU') + word.slice(1);
}