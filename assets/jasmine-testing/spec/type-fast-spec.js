describe("Type Fast", function(){
    describe("Words Match? hero & villian", function(){
        it("Should return False", function(){
            expect(wordsMatch('hero', 'villian')).toBe(false);
        });
    });

    describe("Words Match? tempest & tempest", function(){
        it("Should return True", function(){
            expect(wordsMatch('tempest', 'tempest')).toBe(true);
        });
    });

    describe("Testing capital letters. Mercedes & mercedes", function(){
        it("Should return False", function(){
            expect(wordsMatch('Mercedes', 'mercedes')).toBe(false);
        });
    });

    describe("Testing capital letters. Ford & Ford", function(){
        it("Should return True", function(){
            expect(wordsMatch('Ford', 'Ford')).toBe(true);
        });
    });

    describe("Testing hyphenated words. part-time & part time", function(){
        it("Should return False", function(){
            expect(wordsMatch('part-time', 'part time')).toBe(false);
        });
    });

    describe("Testing hyphenated words. part-time & part-time", function(){
        it("Should return True", function(){
            expect(wordsMatch('part-time', 'part-time')).toBe(true);
        });
    });
});