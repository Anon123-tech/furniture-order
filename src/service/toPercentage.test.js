import toPercentage from "./toPercentage";

describe('toPercentage', function () {
    it('convert to percentage without errors', function () {
            expect(toPercentage(100, 100)).toEqual(100);
            expect(toPercentage(750, 1500)).toEqual(50);
            expect(toPercentage(0, 100)).toEqual(0);
        }
    );
    it('convert to percentage with errors', function () {
            expect(function () {
                toPercentage(0, 0)
            }).toThrow('NaN');
        }
    )
});

