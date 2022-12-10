import { useEffect } from 'react'
import { useState } from 'react'
import './App.css'

function GameRoom() {
  const [board, setBoard] = useState([])
  useEffect( () => {
    fetch("https://raw.githubusercontent.com/doshea/nyt_crosswords/master/1987/07/25.json")
    .then((data) => {
      if (data.status === 200) {
          data.json().then((data) => {
            console.log(data)
          })
      }
    } )
  }, [])


  return (
    <div className="App">
      <div className="header">
        <img src="../GameRoom/eustace-400.webp" width="200"></img>

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
         A B C D E
        </div>
      </div>
      </div>

  )
}

export default GameRoom
