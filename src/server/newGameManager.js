function getCrosswordData(date) {
    const [year, month, day] = date.split("-");

    const puzzleJson = require(`./puzzles/${year}/${month}/${day}.json`);
    return puzzleMapper(puzzleJson);
}

// accepts array and converts to object using starting num before '.' as key
// expected output: { across: {1 : "1. Leaf", 2 : "2. Easter purchase" },
//                      down: {1 : "1. Beauty sleep} }
function clueMapper(clues) {
    return clues.reduce((accum, cur) => {
        const [num, clue] = cur.split(".");
        accum[num] = clue.trim();
        return accum;
    }, {});
}

function puzzleMapper(puzzle) {
    // setup clue list
    const {
        clues: { across }
    } = puzzle;
    const {
        clues: { down }
    } = puzzle;

    // setup answer list
    const answers = { across: {}, down: {} };

    const clues = { across: {}, down: {} };
    clues.across = clueMapper(across);
    clues.down = clueMapper(down);

    const cells = [];

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
                focusRange: {},
                start: null,
                clue: null,
                answer: null,
                prev: null,
                next: null
            },
            down: {
                member: null,
                focusRange: {},
                start: null,
                clue: null,
                answer: null,
                prev: null,
                next: null
            }
        });
    }

    // find across / down data
    let colSize = puzzle.size.cols;
    let findFocusRange = function (start, end, countBy) {
        let indexes = {};
        for (let i = start; i < end; i += countBy) {
            indexes[i] = true;
        }
        return indexes;
    };

    // across specific
    let prevAcrossNum = 0;
    let acrossStart = 0;
    let acrossAnswer = "";
    let acrossAnswerCounter = 0;
    let focusRangeAcross = {};
    let prevValidCell = 0;
    let newPrevValidCell = 0;
    let nextValidCell = 0;

    for (let i = 0; i < puzzle.size.rows; i++) {
        let acrossNum = puzzle.gridnums[i * colSize];

        for (let j = i * colSize; j < i * colSize + puzzle.size.cols; j++) {
            if (puzzle.grid[j] !== ".") {
                if (
                    puzzle.grid[j + 1] === "." ||
                    cells[j].column === colSize - 1
                ) {
                    newPrevValidCell = j;
                }
            }
            if (puzzle.grid[j] === ".") {
                acrossNum = cells[j + 1].gridnums;
                continue;
            }
            // find 1st index of new across gridNum
            if (prevAcrossNum !== acrossNum) {
                cells[prevValidCell].across.next = j;
                acrossStart = j;
                acrossAnswer = puzzle.answers.across[acrossAnswerCounter];
                acrossAnswerCounter++;
                answers.across[acrossNum] = acrossAnswer;
                prevAcrossNum = acrossNum;
                focusRangeAcross = findFocusRange(
                    acrossStart,
                    acrossStart + acrossAnswer.length,
                    1
                );
            }
            cells[j].across.prev = prevValidCell;
            //cells[j].across.next = nextValidCell;
            cells[j].across.focusRange = { ...focusRangeAcross };
            cells[j].across.member = acrossNum;
            cells[j].across.clue = clues.across[acrossNum];
            cells[j].across.start = acrossStart;
            cells[j].across.answer = answers.across[acrossNum];

            prevValidCell = newPrevValidCell;
        }
    }

    // find down data
    let prevDownNum = 0;
    let downStart = 0;
    let focusRangeDown = {};

    downAnswerMapper(puzzle, cells);

    for (let i = 0; i < puzzle.size.cols; i++) {
        let downNum = puzzle.gridnums[i];
        for (let j = i; j + colSize < puzzle.grid.length; j += colSize) {
            if (puzzle.grid[j] === ".") {
                downNum = cells[j + colSize].gridnums;
                continue;
            }
            // find 1st index of new down gridNum
            if (prevDownNum !== downNum) {
                downStart = j;
                prevDownNum = downNum;

                focusRangeDown = findFocusRange(
                    downStart,
                    downStart + cells[j].down.answer.length * colSize,
                    colSize
                );
            }
            cells[j].down.focusRange = { ...focusRangeDown };
            cells[j].down.member = downNum;
            cells[j].down.clue = clues.down[downNum];
            cells[j].down.start = downStart;
        }
    }

    return cells;
}

// Runs 1 pass on cells to read them as constructed in puzzle.clues
// e.g. - 1 down, 2 down, 3 down...
// Uses array map to skip cells it has already read
function downAnswerMapper(puzzle, cells) {
    const puzzleCols = puzzle.size.cols;
    const colMap = new Array(puzzleCols).fill(-1);
    let answerCounter = 0;
    let prevValidDown = 0;

    console.log("cells.length" + cells.length);

    for (let i = 0; i < cells.length; i++) {
        let col = cells[i].column;

        // IF the last searched index in the column < current index
        if (colMap[col] < i) {
            let j = i;

            while (j < cells.length && cells[j].letter !== ".") {
                cells[j].down.answer = puzzle.answers.down[answerCounter];
                cells[j].down.prev = prevValidDown;

                if (i === j) {
                    cells[prevValidDown].down.next = j;
                }

                j += puzzleCols;

                // check if it's the end of the word
                if (j >= cells.length || cells[j].letter === ".") {
                    prevValidDown = j - puzzleCols;
                    answerCounter++;
                }
            }
            colMap[col] = j;
        }
    }
}

exports.getCrosswordData = getCrosswordData;
exports.clueMapper = clueMapper;
/*

map

0: 12
1: 13
2: 14
3: 15

map.get(0)
map.get(map.size-1)

expected output: {
    across: {
        1: [start index, end index]
        2: [start index, end index]

    }
    down: {
        1: [start index, end index]
    }
}





iterate through
iterate through cell array



*/
