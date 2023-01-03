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

    function focusRange(focus) {
        console.log(focus);

        let range = {};
        let start = focus[direction].start;
        let end = focus[direction].answer.length;
        for (let i = start; i < end; i++) {
            range[i] = true;
        }
        return range;
    }

    function fillCell(letter, index, focusRange) {
        let color = "white";

        if (letter === ".") {
            color = "black";
        }
        if (focusRange && focusRange[index]) {
            color = "yellow";
        }
        return color;
    }

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
                setFocusArea({
                    index: index,
                    [direction]: cellData[direction]
                });
                let temp = focusRange(focusArea);
                console.log(focusArea[direction].clue, temp);
                handleNextClick(direction);
            }}
        >
            <rect
                x={x + cellPadding}
                y={y + cellPadding}
                width={cellInner}
                height={cellInner}
                fill={fillCell(letter, index, focusRange)}
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

//

export default Cell;
