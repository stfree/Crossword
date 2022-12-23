import { useEffect } from 'react'
import { useState } from 'react'
import { NormalModuleReplacementPlugin } from 'webpack'
import './App.css'


export default GameRoom


function GameRoom() {
  const [board, setBoard] = useState([])

  useEffect( () => {
    fetch("/createGame?date=1983-10-10")
    .then((data) => {
      if (data.status === 200) {
          data.json().then(({data}) => {
            setBoard(data)
            console.log(data.dow)
          })
      }
    } ).catch((e) => {console.log(e)})
  }, [])

console.log(board[0])
//console.log(board[0])

// ------------------------------

//   -   get puzzle data into a form that we can easily use on the frontend:
//     `javascript
// {
//     acrossMember
//     downMember
//     guess
//     focus
//     letter: "A"/"."
//     row
//     column
//     gridnum
// }


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

/*

 iterate over grid nums
 for each element in array, new object
      gridnum: gridnums[i]
      letter: grid[i]
      focus: false
      guess: ""
      row: i / data.size.rows
      column: i % data.size.rows
      acrossMember: null   // reference pointer to across array index
      downMember: null

for each element in across
  set grid to 0
  set across member to current gridnum until end of string length
  check current gridnum, if 0 then skip
  else -> get current gridnum


*/
// -------------------------



  // to implement date picker:
  // const date = 1979
  // fetch (`/creategame?date=${date}`)

  const rows = [];
  let xWidth = 0
  let yWidth = 0;

  for (let row = 0; row < 15; row++) {
    for (let i = 0; i < 15; i++) {
      rows.push(
      <>
      <rect className={"rec1"} x={xWidth} y={yWidth} width="50" height="50" stroke="black" fill="white" strokeWidth="1" ></rect>
      <text className="gridNum" x={xWidth+2} y={yWidth+14} color="black"> {row+ ","+i} </text>
      </>
      )
      xWidth += 50;
    }
    xWidth = 0;
    yWidth += 50;
  }




  return (
   <div className="body">
    <div className="main">
      <div className="header">
        <img src="/images/eustace-400.webp" width="200"></img>

        <div className="title">
          <span>The New Jersey Times </span>
          <span> Crossword</span>
        </div>
        <div className="settings">
        <span>Settings</span>
        </div>
      </div>
      <div className="clue">
        <span>--Clues here--</span>
      </div>
      <div className="canvas">
        <div className="crossword-grid">
          <svg width="800" height="800" version="1.1" xmlns="http://www.w3.org/2000/svg">
          {rows}
          </svg>
          </div>

      </div>
      </div>
      </div>

  )
}
