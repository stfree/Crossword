import { useEffect } from "react";
import GameRoom from "./GameRoom";
import Cell from "../Cell/Cell";
import { useState } from "react";

function Board({ boardData, setBoardData, setClue, registerGuess }) {
    const [focusArea, setFocusArea] = useState({});
    const [guess, setGuess] = useState();

    console.log(focusArea);

    function nextPosition(coord) {
        while (boardData[coord].letter === ".") {
            coord++;
        }
        return coord;
    }

    return (
        <div
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
                registerGuess(e, focusArea);
                setFocusArea({
                    position: nextPosition(focusArea.position + 1),
                    range: boardData[focusArea.position + 1].across.focusRange
                });
            }}
        >
            <svg viewBox="0 0 150 150">
                {boardData.map((cell) => {
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

/* click --> you have cell data:

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

create map of across clues

{
    1: [0,1,2,3,4]
    2: [5,6,7,8,9]
    3: [11,12,14]
}
pull acrossMember from cell as key, iterate through array values to change the focus to true
if focus = true,

boardData.map((element, targetIndex) => {
    if (element.index === targetIndex) {
        return
    }
})






*/
