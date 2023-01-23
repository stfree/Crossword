import { useEffect } from "react";
import GameRoom from "./GameRoom";
import Cell from "../Cell/Cell";
import { useState } from "react";

function Board({ boardData, setBoardData, setClue, registerGuess }) {
    const [focusArea, setFocusArea] = useState({});
    const [guess, setGuess] = useState();

    console.log(focusArea);

    function nextPosition(coord) {
        while (boardData.cells[coord].letter === ".") {
            coord++;
        }
        return coord;
    }

    function nextRange(focusArea) {
        return boardData.cells[focusArea.position].across.focusRange;
    }

    return (
        <div
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
                registerGuess(e, focusArea);
                setFocusArea({
                    position: nextPosition(focusArea.position + 1),
                    range: nextRange(focusArea)
                });
            }}
        >
            <svg viewBox="0 0 150 150">
                {boardData.cells.map((cell) => {
                    return (
                        <Cell
                            key={cell.index}
                            cellData={cell}
                            setBoardData={setBoardData}
                            setClue={setClue}
                            focusArea={focusArea}
                            setFocusArea={setFocusArea}
                        />
                    );
                })}
            </svg>
        </div>
    );
}

export default Board;
