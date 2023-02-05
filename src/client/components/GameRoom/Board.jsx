import { React } from "react";
import GameRoom from "./GameRoom";
import Cell from "../Cell/Cell";
import { useState } from "react";

function Board({
    boardData,
    setBoardData,
    setClue,
    registerGuess,
    focusArea,
    setFocusArea
}) {
    return (
        <div
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
                registerGuess(e, focusArea); // callback function to update state in GameRoom
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
