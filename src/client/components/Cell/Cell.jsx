import { React } from "react";

function Cell({ cellData, focusArea, changeFocus, onNewCell }) {
    const {
        guess,
        row,
        column,
        letter,
        gridnums,
        index,
        acrossMember,
        downMember
    } = cellData;
    const { direction, position, range } = focusArea;
    const cellPadding = 0;
    const cellSize = 10;
    const cellInner = 10;
    const x = column * cellSize;
    const y = row * cellSize;

    function fillCell() {
        let color = "white";

        if (letter === ".") {
            color = "black";
        }
        if (direction === "across" && acrossMember === range) {
            // acrossMember doesn't work, but cellData.acrossMember does ??
            color = "#87CEEB";
        }
        if (direction === "down" && downMember === range) {
            color = "#87CEEB";
        }
        if (index === position) {
            color = "orange";
        }
        return color;
    }

    return (
        <g
            onClick={() => {
                if (letter !== ".") {
                    if (position === index) {
                        changeFocus();
                    } else {
                        onNewCell(cellData);
                    }
                    // console.log(
                    //     cellData.index,
                    //     cellData[`${focusArea.direction}Member`],
                    //     focusArea.direction,
                    //     focusArea
                    // );
                }
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

export default Cell;
