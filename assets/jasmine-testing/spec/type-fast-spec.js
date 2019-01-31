describe("Type Fast", function(){
    describe("Words Match? Hero & Villian", function(){
        it("Should return False", function(){
            expect(wordsMatch('Hero', 'Villian')).toBe(false);
        });
    });

    describe("Words Match? Tempest & Tempest", function(){
        it("Should return True", function(){
            expect(wordsMatch('Tempest', 'Tempest')).toBe(true);
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