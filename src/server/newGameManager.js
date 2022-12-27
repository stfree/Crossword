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

    clueMapper(puzzle.clues.across, "across");
    clueMapper(puzzle.clues.down, "down");

    // accepts array and converts to object using starting num before '.' as key
    function clueMapper(array, target) {
        for (let i = 0; i < array.length; i++) {
            let clueNum = array[i].split(".", 1);
            clues[target][clueNum] = array[i];
            // console.log("test", clueNum, array[i]);
        }
    }

    //console.log(clues);

    const cells = [];
    // console.log(puzzle);

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
            acrossClue: null,
            downClue: null
        });
    }

    // find acrossMember
    for (let i = 0; i < puzzle.size.rows; i++) {
        let acrossNum = puzzle.gridnums[i];
        for (let j = i * 15; j < i * 15 + puzzle.size.cols; j++) {
            if (puzzle.grid[j] === ".") {
                acrossNum = cells[j + 1].gridnums;
                continue;
            }
            //   console.log("i:" + i, " j:" + j);
            cells[j].acrossMember = acrossNum;
            cells[j].acrossClue = clues.across[acrossNum];
        }
    }

    // if letter is "." (black square) or you're at the end of the line,
    // update acrossNum
    //     if (puzzle.grid[i].row > row ) {
    //         row = puzzle.grid[i].row
    //         acrossNum = cells[i].gridnums;
    //     }

    //     if (puzzle.grid[i + 1] === undefined) {
    //         cells[i].acrossMember = acrossNum;
    //         continue;
    //     }
    //     // when you update acrossNum
    //     if (cells[i].column === 0 || acrossNum === null) {
    //         acrossNum = cells[i].gridnums;
    //     }
    //     // if you find a ".", reset acrossNum to null
    //     if (puzzle.grid[i] === ".") {
    //         acrossNum = null;
    //         continue;
    //     }
    //     cells[i].acrossMember = acrossNum;
    // }

    // find downMember
    //            0  ...   15
    for (let i = 0; i < puzzle.size.cols; i++) {
        let downNum = puzzle.gridnums[i];
        for (let j = i; j + 15 < puzzle.grid.length; j += 15) {
            //console.log(j)

            if (puzzle.grid[j] === ".") {
                downNum = cells[j + 15].gridnums;
                continue;
            }
            cells[j].downMember = downNum;
            cells[j].downClue = clues.down[downNum];
        }
    }
    //console.log("inside puzzle mapper function", puzzle);
    return cells;
}

exports.getCrosswordData = getCrosswordData;
