import { React } from "react";

function ClueList({ board, focusArea, onClueClick }) {
    return board.clueArrayDown.map((clue) => {
        let className = "";
        const clueText = clue.split(/\.(.*)/, 2);
        if (
            focusArea.position > -1 &&
            board.cells[focusArea.position].downClue === clueText[1].trim()
        ) {
            if (focusArea.direction === "down") {
                className = "highlight-primary";
            } else {
                className = "highlight-secondary";
            }
        }
        return (
            <li
                className={className}
                onClick={(event) => {
                    onClueClick("down", clueText[0].trim() * 1);
                }}
            >
                {clue}
            </li>
        );
    });
}

export default ClueList;
