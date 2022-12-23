function getCrosswordData(date) {
    const [year,month,day] = date.split('-');

    const puzzleJson = require(`./puzzles/${year}/${month}/${day}.json`)
    return puzzleMapper(puzzleJson)
}

function puzzleMapper(puzzle) {
    const cells = []

    for (let i = 0; i < puzzle.grid.length; i++) {

    cells.push({
        index: i,    // debug
        gridnums: puzzle.gridnums[i],
        letter: puzzle.grid[i],
        focus: false,
        guess: "",
        row: Math.floor(i / puzzle.size.rows),
        column: i % puzzle.size.rows,
        acrossMember: null,
        downMember: null
    })
    }

    // find acrossMember
    let acrossNum = 0;
    for (let i = 0; i < puzzle.grid.length; i++) {


    // if letter is "." (black square) or you're at the end of the line,
        // update acrossNum
        if (puzzle.grid[i+1] === undefined) {
            cells[i].acrossMember = acrossNum;
            continue
        }
        // when you update acrossNum
        if (cells[i].column === 0 || acrossNum === null) {
            acrossNum = cells[i].gridnums
        }
        // if you find a ".", reset acrossNum to null
        if (puzzle.grid[i] === ".") {
            acrossNum = null
            continue
        }
        cells[i].acrossMember = acrossNum;


    }

    // find downMember
    // iterate from
    // [0,15,31,46,61,76,91,106,121,136,151,166,181,196]
    // start from row 0, then row 1, 2, 3
            // for i ... 15
                 // start from 0, add i+=15 while (i + 15) < grid length
    for (let i = 0; i < puzzle.size.cols; i++) {
        let downNum = puzzle.gridnums[i]
        for (let j = i; j + 15 < puzzle.grid.length; j += 15) {
            console.log(j)

            if (puzzle.grid[j] === ".") {
                downNum = cells[j+15].gridnums
                continue
            }
            cells[j].downMember = downNum;
        }
    }
    // console.log("inside puzzle mapper function", cells)
    return cells
}

exports.getCrosswordData = getCrosswordData;
