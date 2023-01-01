import { react, useState } from "react";

function Cell({ cellData, setBoardData, setClue, focusArea, setFocusArea }) {
    const {
        row,
        column,
        letter,
        gridnums,
        across,
        down,
        acrossClue,
        focus,
        index
    } = cellData;
    const cellPadding = 0;
    const cellSize = 10;
    const cellInner = 10;
    const x = column * cellSize;
    const y = row * cellSize;
    const fill = letter === "." ? "black" : "white";

    const [direction, setDirection] = useState("across");

    function handleNextClick(direction) {
        if (direction === "across") {
            direction = "down";
        } else {
            direction = "across";
        }
        setDirection(direction);
    }

    return (
        <g
            onClick={() => {
                setClue(cellData[direction].clue);
                console.log(cellData[direction].clue);
                setFocusArea({
                    index: index,
                    direction: direction
                });
                handleNextClick(direction);
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
