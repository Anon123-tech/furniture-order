import capitalize from "./capitalize";

describe('text capitalizing', function () {
    it('capitalize string without errors', function () {
        expect(capitalize('react app')).toEqual('React app');
    });

    it('capitalize empty string with thrown error', function () {
        expect(function () {
            capitalize('');
        }).toThrow('passed');
    })
});