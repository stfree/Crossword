const getIndex = (row, width, col) => row * width + col;

function scanClueCells(start, clueLength, colSize, direction) {
    const cells = [];
    let steps = clueLength;
    let [row, column, index] = start;
    while (steps > 0) {
        cells.push([row, column, index]);
        if (direction === "D") {
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
            const cellIndex = cellOb[1][2];
            const dir = direction === "A" ? "across" : "down";
            cells[cellIndex][dir].focusRange[cellIndex] = true;
            cells[cellIndex][dir].answer = answer;
            cells[cellIndex][dir].clue = clue;
            cells[cellIndex][dir].member = gridnum;
            cells[cellIndex][dir].start = position[2];
            cells[cellIndex][dir].next = getNextClueCellIndex(
                gridnum,
                clueMap,
                cluesArray
            );
            cells[cellIndex][dir].prev = getPreviousClueCellIndex(
                gridnum,
                clueMap,
                cluesArray
            );
        });
    }
};

const generateMemberObject = () => ({
    ...{
        member: null,
        focusRange: {},
        start: null,
        clue: null,
        answer: null,
        prev: null,
        next: null
    }
});

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
        index,
        gridnums: gridnums[index],
        letter: cell,
        focus: false,
        guess: "",
        row: row(index),
        column: column(index),
        across: generateMemberObject(),
        down: generateMemberObject()
    }));

    return cells.map((cell, index) => {
        if (cell.letter !== "." && gridnums[index] !== 0) {
            populateMemberObject(
                cells,
                gridnums[index],
                [row(index), column(index), index],
                acrossClueMap,
                size,
                "A",
                acrossAnswersArray,
                acrossCluesArray
            );

            populateMemberObject(
                cells,
                gridnums[index],
                [row(index), column(index), index],
                downClueMap,
                size,
                "D",
                downAnswersArray,
                downCluesArray
            );
        }
        return cell;
    });
}

/* eslint-disable no-param-reassign */
function clueMapper(clues) {
    return clues.reduce((accum, cur, index) => {
        const [num, clue] = cur.split(".");
        accum[num] = { clue: clue.trim(), index };
        return accum;
    }, {});
}

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
        clueMapper(puzzle.clues.across),
        clueMapper(puzzle.clues.down),
        puzzle.answers.across,
        puzzle.clues.across,
        puzzle.answers.down,
        puzzle.clues.down
    )
});

exports.puzzleMapper = puzzleMapper;
