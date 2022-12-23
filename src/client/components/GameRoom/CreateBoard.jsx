import { useEffect } from 'react'
import GameRoom from './GameRoom'
export default CreateBoard

export function CreateBoard({ board }) {
    if (board === []) {
      console.log("no data in board")
    } else {

    //console.log(board[0])

    const rows = [];
    let xWidth = 0
    let yWidth = 0;

    for (let row = 0; row < 15; row++) {
      for (let i = 0; i < 15; i++) {
        rows.push(
        <>
        <rect className={"rec1"} x={xWidth} y={yWidth} width="50" height="50" stroke="black" fill="white" strokeWidth="1" ></rect>
        <text className="gridNum" x={xWidth+2} y={yWidth+14} color="black"> {row + "," + i} </text>
        </>)
        xWidth += 50;
      }
      xWidth = 0;
      yWidth += 50;
    }
  return rows
  }
}
