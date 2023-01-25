const { puzzleMapper } = require("./puzzleMapper");

function getCrosswordData(date) {
    const [year, month, day] = date.split("-");

    const puzzleJson = require(`./puzzles/${year}/${month}/${day}.json`);
    return puzzleMapper(puzzleJson);
}

exports.getCrosswordData = getCrosswordData;
