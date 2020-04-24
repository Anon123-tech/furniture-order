export default function toRubles(percentage, total) {
    const rubles = total * percentage / 100;
    if (Number.isNaN(rubles)) {
        throw new Error('output is NaN!')
    }
    return rubles
}