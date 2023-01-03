import { useEffect } from "react";
import GameRoom from "./GameRoom";
import Cell from "../Cell/Cell";
import { useState } from "react";

function CreateBoard({ boardData, setBoardData, setClue }) {
    const [focusArea, setFocusArea] = useState([]);

    console.log(focusArea);

    // const rows = [];
    // let xWidth = 0
    // let yWidth = 0;

    // for (let row = 0; row < 15; row++) {
    //   for (let i = 0; i < 15; i++) {
    //     rows.push(
    //     <>
    //     <rect className={"rec1"} x={xWidth} y={yWidth} width="50" height="50" stroke="black" fill="white" strokeWidth="1" ></rect>
    //     <text className="gridNum" x={xWidth+2} y={yWidth+14} color="black"> {row + "," + i} </text>
    //     </>)
    //     xWidth += 50;
    //   }
    //   xWidth = 0;
    //   yWidth += 50;
    // }
    return (
        <div>
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

export default CreateBoard;

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
