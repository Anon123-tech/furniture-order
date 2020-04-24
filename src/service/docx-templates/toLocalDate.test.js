import toLocalDate from "./toLocalDate";

describe.skip('is date valid', function () {
    it('localize date without errors', function () {
        const [year, month, day] = toLocalDate('1970-01-01').toString().split('-');
        expect(toLocalDate('1970-01-01')).toEqual('01.01.1970');
    });

    it('localize invalid date with thrown error', function () {
        expect(function () {
            toLocalDate('abc');
        }).toThrow('Invalid');
    })
});