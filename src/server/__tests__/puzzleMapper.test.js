const { puzzleMapper } = require("../puzzleMapper");
const MOCK_PUZZLE = require(`../puzzles/1993/07/11.json`);

test("expect puzzlemapper to produce output matching the snapshot", () => {
    expect(puzzleMapper(MOCK_PUZZLE)).toMatchSnapshot();
});
