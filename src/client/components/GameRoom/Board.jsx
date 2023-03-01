import { React } from "react";
import Cell from "../Cell/Cell";

function Board({
    boardData,
    registerGuess,
    focusArea,
    changeFocus,
    onNewCell
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
                {boardData.cells.map((cell) => (
                    <Cell
                        key={cell.index}
                        cellData={cell}
                        focusArea={focusArea}
                        changeFocus={changeFocus}
                        onNewCell={onNewCell}
                    />
                ))}
            </svg>
        </div>
    );
}

export default Board;
