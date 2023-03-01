import { React } from "react";

function ClueList({ clueArray, direction, cells, focusArea, onClueClick }) {
    return clueArray.map((clue) => {
        let className = "";
        const clueText = clue.split(/\.(.*)/, 2);
        if (
            focusArea.position > -1 &&
            cells[focusArea.position][`${direction}Clue`] === clueText[1].trim()
        ) {
            if (focusArea.direction === direction) {
                className = "highlight-primary";
            } else {
                className = "highlight-secondary";
            }
        }
        return (
            <li
                className={className}
                onClick={() => {
                    onClueClick(direction, clueText[0].trim() * 1);
                }}
            >
                {clue}
            </li>
        );
    });
}

export default ClueList;
