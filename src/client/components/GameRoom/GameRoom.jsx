import { useEffect } from "react";
import { useState } from "react";
import { NormalModuleReplacementPlugin } from "webpack";
import "./App.css";
import CreateBoard from "./CreateBoard";

function GameRoom() {
    const [board, setBoard] = useState([]);
    const [clue, setClue] = useState(["--clues here--"]);

    useEffect(() => {
        fetch("/createGame?date=1983-10-10")
            .then((data) => {
                if (data.status === 304 || data.status === 200) {
                    data.json().then(({ data }) => {
                        setBoard(data);
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        console.log(board);
    }, [board]);

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
                    <span>{clue}</span>
                </div>
                <div className="canvas">
                    <div className="crossword-grid">
                        {board[0] && (
                            <CreateBoard
                                boardData={board}
                                setBoardData={setBoard}
                                setClue={setClue}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
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

export default GameRoom;
