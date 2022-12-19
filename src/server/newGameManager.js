function getCrosswordData(date) {
    const [year,month,day] = date.split('-');

    const puzzleJson = require(`./puzzles/${year}/${month}/${day}.json`)
    return puzzleMapper(puzzleJson)
}

function puzzleMapper(puzzle) {
    const cells = []

// for (let i = 0; i < data.grid.length; i++) {

//   cells.push({
//       gridnum: data.gridnums[i],
//       letter: data.grid[i],
//       focus: false,
//       guess: "",
//       row: i / data.size.rows,
//       column: i % data.size.rows,
//       acrossMember: null,
//       downMember: null
//   })
// }
//   console.log(cells);



    console.log("inside puzzle mapper function", puzzle)

    return puzzle
}

exports.getCrosswordData = getCrosswordData;
