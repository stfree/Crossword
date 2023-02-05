const { clueMapper } = require("../newGameManager");

test("maps clues correctly", () => {
    const MOCKDATA = ["1. first clue", "2. second clue", "3. third clue"];
    expect(clueMapper(MOCKDATA)).toMatchObject({
        1: "first clue",
        2: "second clue",
        3: "third clue"
    });
});
