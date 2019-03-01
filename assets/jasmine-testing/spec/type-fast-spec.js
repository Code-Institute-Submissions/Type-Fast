describe("Type Fast", function () {

    it("returns false for two unequal strings (hero & villian)", function () {
        expect(wordsMatch('hero', 'villian')).toBe(false);
    });

    it("returns true for two equal strings (tempest & tempest)", function () {
        expect(wordsMatch('tempest', 'tempest')).toBe(true);
    });

    it("returns false for two unequal strings, one with a capitialised letter (Mercedes & mercedes)", function () {
        expect(wordsMatch('Mercedes', 'mercedes')).toBe(false);
    });

    it("returns true with two equal strings, both capitialised (Ford & Ford)", function () {
        expect(wordsMatch('Ford', 'Ford')).toBe(true);
    });

    it("returns false for two unequal strings, one hypgenated and one without a hyphen (part-time & part time)", function () {
        expect(wordsMatch('part-time', 'part time')).toBe(false);
    });

    it("returns true for two equal strings, both hyphenated (part-time & part-time)", function () {
        expect(wordsMatch('part-time', 'part-time')).toBe(true);
    });

});