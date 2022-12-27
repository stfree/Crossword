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
            acrossMember: null,
            downMember: null,
            acrossStart: null,
            downStart: null,
            acrossClue: null,
            downClue: null,
            acrossAnswer: null,
            downAnswer: null
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
                let acrossAnswer =
                    acrossNum + "." + " " + puzzle.answers.across[k];
                k++;
                answers.across[acrossNum] = acrossAnswer;
                prevAcrossNum = acrossNum;
            }

            cells[j].acrossMember = acrossNum;
            cells[j].acrossClue = clues.across[acrossNum];
            cells[j].acrossStart = acrossStart;
            cells[j].acrossAnswer = answers.across[acrossNum];
        }
    }

    // find down data
    for (let i = 0; i < puzzle.size.cols; i++) {
        let downNum = puzzle.gridnums[i];
        for (let j = i; j + 15 < puzzle.grid.length; j += 15) {
            if (puzzle.grid[j] === ".") {
                downNum = cells[j + 15].gridnums;
                continue;
            }
            cells[j].downMember = downNum;
            cells[j].downClue = clues.down[downNum];
        }
    }
    console.log("inside puzzle mapper function", clues, answers);
    return cells;
}

exports.getCrosswordData = getCrosswordData;
