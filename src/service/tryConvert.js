export default function tryConvert(value, total, convert) {
    const input = parseFloat(value);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input, total);
    const rounded = Math.round(output);
    return +rounded;
}