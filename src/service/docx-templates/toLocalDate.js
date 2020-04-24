import isValidDate from "./isValidDate";

export default function toLocalDate(dateString) {
    const date = new Date(dateString);
    if (!isValidDate(date)) {
        throw new TypeError('Invalid date!')
    }
    return date.toLocaleDateString("ru-RU");
}
