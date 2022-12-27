import { react, useState } from "react";

function Cell({ cellData, setBoardData, setClue, focusArea, setFocusArea }) {
    const {
        row,
        column,
        letter,
        gridnums,
        acrossClue,
        acrossMember,
        downMember,
        focus,
        index
    } = cellData;
    const cellPadding = 0;
    const cellSize = 10;
    const cellInner = 10;
    const x = column * cellSize;
    const y = row * cellSize;
    const fill = letter === "." ? "black" : "white";
    let direction = true;

    function handleNextClick() {
        direction === "across" ? "down" : "across";
    }

    return (
        <g
            onClick={() => {
                setClue(acrossClue);
                console.log(acrossClue);
                setFocusArea(acrossMember);
            }}
        >
            <rect
                x={x + cellPadding}
                y={y + cellPadding}
                width={cellInner}
                height={cellInner}
                fill={fillCell(letter, focus)}
                stroke="black"
                strokeWidth={cellSize / 50}
            />
            {gridnums && (
                <text
                    x={x + cellPadding * 4 + 0.5}
                    y={y + cellPadding * 4 + 0.5}
                    textAnchor="start"
                    dominantBaseline="hanging"
                    style={{ fontSize: "16%", fill: "Black" }}
                >
                    {gridnums}
                </text>
            )}
            <text
                x={x + 5}
                y={y + 5}
                textAnchor="middle"
                dominantBaseline="middle"
                style={{ fontSize: "25%" }}
            >
                {letter}
            </text>
        </g>
    );
}

function fillCell(letter, focus, index, setBoardData) {
    let color = "white";

    if (letter === ".") {
        color = "black";
    }
    if (focus) {
        color = "blue";
    }
    return color;
}

export default Cell;
