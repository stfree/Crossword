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

    function prevPosition(coord) {
        if (coord <= 0) {
            return 0;
        }
        while (boardData.cells[coord].letter === ".") {
            coord--;
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
                if (e.key.toUpperCase() === "BACKSPACE") {
                    e.key = "";
                    registerGuess(e, focusArea);
                    let prev = prevPosition(focusArea.position - 1);
                    setFocusArea({
                        position: prev,
                        range: boardData.cells[prev].across.focusRange
                    });
                }

                if (e.key.toUpperCase().match(/^[A-Z]$/)) {
                    registerGuess(e, focusArea);
                    let next = nextPosition(focusArea.position + 1);
                    setFocusArea({
                        position: next,
                        range: boardData.cells[next].across.focusRange
                    });
                }
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
