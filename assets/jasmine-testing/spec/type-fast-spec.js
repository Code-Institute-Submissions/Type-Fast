describe("Type Fast", function(){
    describe("Words Match? Hero & Villian", function(){
        it("Should return False", function(){
            expect(wordsMatch('Hero', 'Villian')).toBe(false);
        })
    })

    describe("Words Match? Tempest & Tempest", function(){
        it("Should return True", function(){
            expect(wordsMatch('Tempest', 'Tempest')).toBe(true);
        })
    })
})