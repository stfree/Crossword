import { React } from "react";
import Cell from "../Cell/Cell";

function Board({
    boardData,
    registerGuess,
    focusArea,
    changeFocus,
    onNewCell
}) {
    // viewBox 0 0 150 150
    const cols = boardData.size.cols * 10;
    const rows = boardData.size.rows * 10;
    const viewBox = `0 0 ${cols} ${rows}`;
    return (
        <div
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
                registerGuess(e, focusArea); // callback function to update state in GameRoom
            }}
        >
            <svg viewBox={viewBox}>
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
