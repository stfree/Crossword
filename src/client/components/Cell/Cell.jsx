import { React, useState } from "react";

function Cell({ cellData, setBoardData, setClue, focusArea, setFocusArea }) {
    const {
        guess,
        row,
        column,
        letter,
        gridnums,
        focusRange,
        across,
        down,
        acrossClue,
        focus,
        index,
        downMember
    } = cellData;
    const { position, range } = focusArea;
    const cellPadding = 0;
    const cellSize = 10;
    const cellInner = 10;
    const x = column * cellSize;
    const y = row * cellSize;
    const fill = letter === "." ? "black" : "white";
    const [direction, setDirection] = useState("across");
    //    const [range, setRange] = useState(-1);

    function fillCell(letter, index) {
        let color = "white";

        if (letter === ".") {
            color = "black";
        }
        if (range && range[index]) {
            color = "#87CEEB";
        }
        if (index === position) {
            color = "orange";
        }
        return color;
    }

    function toggleClue(direction) {
        return direction === "across" ? "down" : "across";
    }

    function handleNextClick(direction) {
        setDirection(toggleClue(direction));
    }

    function onNewCell() {
        setClue(cellData[direction].clue);
        setFocusArea({
            position: index,
            range: cellData[direction].focusRange
        });
        console.log(cellData[direction].clue);
    }

    return (
        <g
            onClick={() => {
                if (letter !== ".") {
                    onNewCell();
                    handleNextClick(direction);
                }
            }}
            onKeyDown={() => {
                setFocusArea({
                    position: index + 1,
                    range: cellData[direction].focusRange
                });
            }}
        >
            <rect
                x={x + cellPadding}
                y={y + cellPadding}
                width={cellInner}
                height={cellInner}
                fill={fillCell(letter, index, range)}
                stroke="black"
                strokeWidth={cellSize / 50}
            />
            <polygon points="5 0,10 0,10 5" fill="red"></polygon>
            {gridnums && (
                <text
                    x={x + cellPadding * 4 + 0.4}
                    y={y + cellPadding * 4 + 0.4}
                    textAnchor="start"
                    dominantBaseline="hanging"
                    style={{ fontSize: "14%", fill: "Black", zIndex: "0" }}
                >
                    {gridnums}
                </text>
            )}
            <text
                x={x + 5}
                y={y + 6.5}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: "28%", fontWeight: "100", zIndex: "1" }}
            >
                {guess}
            </text>
        </g>
    );
}

//

export default Cell;
