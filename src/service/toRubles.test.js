import toRubles from "./toRubles";

describe('toRubles', function () {
    it('convert to rubles without errors', function () {
            expect(toRubles(100, 100)).toEqual(100);
            expect(toRubles(50, 50)).toEqual(25);
            expect(toRubles(75, 1500)).toEqual(1125);
        }
    );
    it('convert to rubles with errors', function () {
          /*  expect(function () {
                toPercentage('123', 0)
            }).toThrow('NaN');*/
        }
    )
})
;

