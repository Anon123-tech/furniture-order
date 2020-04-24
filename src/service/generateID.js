// @flow
function* IdGenerator(start: number = 0): number {
    let id = start;
    while (true) {
        yield id++;
    }
}

const iterator = IdGenerator();

export default function generateID() {
    return iterator.next().value;
};