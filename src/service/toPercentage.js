export default function toPercentage(rubles, total) {
    const percentage = rubles / total * 100;
    if (Number.isNaN(percentage)) {
        throw new Error('output is NaN!')
    }
    return percentage;
}