// ? why not just use regular function syntax here
const getIndex = (row, width, col) => row * width + col;

// recieves: answer word
// returns cells [row, column, index]
function scanClueCells(start, clueLength, colSize, direction) {
    const cells = [];
    let steps = clueLength;
    let [row, column, index] = start;
    while (steps > 0) {
        cells.push([row, column, index]);
        if (direction === "down") {
            row += 1;
        } else {
            column += 1;
        }
        index = getIndex(row, colSize, column);
        steps -= 1;
    }
    return cells;
}

function getNextClueCellIndex(currentMember, clueMap, clueArray) {
    const nextClue = clueArray[clueMap[currentMember].index + 1];
    return nextClue ? nextClue.split(".")[0] : undefined;
}

function getPreviousClueCellIndex(currentMember, clueMap, clueArray) {
    const nextClue = clueArray[clueMap[currentMember].index - 1];
    return nextClue ? nextClue.split(".")[0] : undefined;
}

/* eslint-disable no-param-reassign */
const populateMemberObject = (
    cells,
    gridnum,
    position,
    clueMap,
    size,
    direction,
    answersArray,
    cluesArray
) => {
    const answerIndex = clueMap[gridnum]?.index;
    const clue = clueMap[gridnum]?.clue;
    if (answerIndex !== undefined) {
        const answer = answersArray[answerIndex];
        const clueCells = scanClueCells(
            position,
            answer.length,
            size.cols,
            direction
        );
        Object.entries(clueCells).forEach((cellOb) => {
            const cellIndex = cellOb[1][2]; // cellOb =  [0: clueCellsIndex,  1:[row, column, index], ...]
            cells[cellIndex][`${direction}Answer`] = answer;
            cells[cellIndex][`${direction}Clue`] = clue;
            cells[cellIndex][`${direction}Member`] = gridnum;
            cells[cellIndex][`${direction}Start`] = position[2];
            cells[cellIndex][`${direction}Next`] = getNextClueCellIndex(
                gridnum,
                clueMap,
                cluesArray
            );
            cells[cellIndex][`${direction}Prev`] = getPreviousClueCellIndex(
                gridnum,
                clueMap,
                cluesArray
            );
        });
    }
};

function generateCellsObjectArray(
    grid,
    gridnums,
    size,
    acrossClueMap,
    downClueMap,
    acrossAnswersArray,
    acrossCluesArray,
    downAnswersArray,
    downCluesArray
) {
    const row = (index) => Math.floor(index / size.rows);
    const column = (index) => index % size.rows;
    const cells = grid.map((cell, index) => ({
        index, // creates 0: {} ? why isn't it index, { gridnums: ....}
        gridnums: gridnums[index],
        letter: cell,
        focus: false,
        guess: "",
        row: row(index),
        column: column(index),
        acrossMember: null,
        downMember: null,
        acrossStart: null,
        downStart: null,
        acrossClue: null,
        downClue: null,
        acrossAnswer: null,
        downAnswer: null,
        acrossPrev: null,
        downPrev: null,
        acrossNext: null,
        downNext: null
    }));

    return cells.map((cell, index) => {
        if (cell.letter !== "." && gridnums[index] !== 0) {
            populateMemberObject(
                cells,
                gridnums[index],
                [row(index), column(index), index],
                acrossClueMap,
                size,
                "across",
                acrossAnswersArray,
                acrossCluesArray
            );

            populateMemberObject(
                cells,
                gridnums[index],
                [row(index), column(index), index],
                downClueMap,
                size,
                "down",
                downAnswersArray,
                downCluesArray
            );
        }
        return cell;
    });
}

// input: clue array from JSON
// output: [{clue: 'place to relax', index: 2}, ...]
/* eslint-disable no-param-reassign */
function clueMapper(clues) {
    return clues.reduce((accum, cur, index) => {
        const [num, clue] = cur.split(".");
        accum[num] = { clue: clue.trim(), index };
        return accum;
    }, {});
}

// start here
const puzzleMapper = (puzzle) => ({
    answers: { across: {}, down: {} },
    clueArrayAcross: puzzle.clues.across,
    clueArrayDown: puzzle.clues.down,
    clues: {
        across: clueMapper(puzzle.clues.across),
        down: clueMapper(puzzle.clues.down)
    },
    cells: generateCellsObjectArray(
        puzzle.grid,
        puzzle.gridnums,
        puzzle.size,
        clueMapper(puzzle.clues.across), // repeating from 158?
        clueMapper(puzzle.clues.down),
        puzzle.answers.across,
        puzzle.clues.across,
        puzzle.answers.down,
        puzzle.clues.down
    )
});

exports.puzzleMapper = puzzleMapper;
