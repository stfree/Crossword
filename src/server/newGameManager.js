function getCrosswordData(date) {
    const [year, month, day] = date.split("-");

    const puzzleJson = require(`./puzzles/${year}/${month}/${day}.json`);
    return puzzleMapper(puzzleJson);
}

function puzzleMapper(puzzle) {
    const clues = {
        across: {},
        down: {}
    };

    const answers = {
        across: {},
        down: {}
    };

    objectMapper(puzzle.clues.across, clues, "across");
    objectMapper(puzzle.clues.down, clues, "down");

    // accepts array and converts to object using starting num before '.' as key
    // expected output: { across: {1 : "1. Leaf", 2 : "2. Easter purchase" },
    //                      down: {1 : "1. Beauty sleep} }
    function objectMapper(array, objectName, direction) {
        for (let i = 0; i < array.length; i++) {
            let numKey = array[i].split(".", 1);
            objectName[direction][numKey] = array[i];
        }
    }

    const cells = [];
    const gridMap = { across: [], down: [] };

    for (let i = 0; i < puzzle.grid.length; i++) {
        cells.push({
            index: i, // debug
            gridnums: puzzle.gridnums[i],
            letter: puzzle.grid[i],
            focus: false,
            guess: "",
            row: Math.floor(i / puzzle.size.rows),
            column: i % puzzle.size.rows,
            across: {
                member: null,
                start: null,
                clue: null,
                answer: null
            },
            down: {
                member: null,
                start: null,
                clue: null,
                answer: null
            }
        });
    }
    // find across data
    let prevAcrossNum = 0;
    let acrossStart = 0;
    let acrossAnswer = "";
    let k = 0;

    for (let i = 0; i < puzzle.size.rows; i++) {
        let acrossNum = puzzle.gridnums[i * 15];
        for (let j = i * 15; j < i * 15 + puzzle.size.cols; j++) {
            if (puzzle.grid[j] === ".") {
                acrossNum = cells[j + 1].gridnums;
                continue;
            }
            // find 1st index of new across gridNum
            if (prevAcrossNum !== acrossNum) {
                acrossStart = j;
                acrossAnswer = puzzle.answers.across[k];
                k++;
                answers.across[acrossNum] = acrossAnswer;
                prevAcrossNum = acrossNum;
            }
            cells[j].across.member = acrossNum;
            cells[j].across.clue = clues.across[acrossNum];
            cells[j].across.start = acrossStart;
            cells[j].across.answer = answers.across[acrossNum];
        }
    }

    // find down data
    let prevDownNum = 0;
    let downStart = 0;
    let downAnswer = "";
    let m = 0;

    for (let i = 0; i < puzzle.size.cols; i++) {
        let downNum = puzzle.gridnums[i];
        for (let j = i; j + 15 < puzzle.grid.length; j += 15) {
            if (puzzle.grid[j] === ".") {
                downNum = cells[j + 15].gridnums;
                continue;
            }
            // find 1st index of new across gridNum
            if (prevDownNum !== downNum) {
                downStart = j;
                downAnswer = puzzle.answers.down[m];
                m++;
                answers.down[downNum] = downAnswer;
                prevDownNum = downNum;
            }
            cells[j].down.member = downNum;
            cells[j].down.clue = clues.down[downNum];
            cells[j].down.start = downStart;
            cells[j].down.answer = answers.down[downNum];
        }
    }
    // console.log("inside puzzle mapper function", clues, answers);
    return cells;
}
exports.getCrosswordData = getCrosswordData;
