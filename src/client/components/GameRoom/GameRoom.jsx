import { useEffect } from 'react'
import { useState } from 'react'
import { NormalModuleReplacementPlugin } from 'webpack'
import './App.css'
import CreateBoard from './CreateBoard'


export default GameRoom





function GameRoom() {
  const [board, setBoard] = useState([])

  useEffect( () => {
    fetch("/createGame?date=1983-10-10")
    .then((data) => {
      if (data.status === 304 || data.status === 200) {
          data.json().then(({data}) => {
            setBoard(data)
          })
      }
    }).catch((e) => {console.log(e)})
  }, [])



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
            {board.length === 0
              ? () => {return (<text> ...Loading</text>)}
              : <CreateBoard boardData={board}/>
            }
          </svg>
        </div>
      </div>
    </div>
  </div>
  )
}


// function setupBoard({setBoard}) {
//     useEffect( () => {
//     fetch("/createGame?date=1983-10-10")
//     .then((data) => {
//       if (data.status === 304 || data.status === 200) {
//           data.json().then(({data}) => {
//             setBoard(data)
//             // console.log(data[0].gridnums)

//           })
//       }
//     }).catch((e) => {console.log(e)})
//   }, [])

// }



//   <CreateBoard boardData={board}/>}

function CreateBoardTwo(board) {
    console.log(board[0])

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
