import { react } from "react";

function Cell({ cellData }) {
    const { row, column, letter, gridNums, acrossMember, downMember } =
        cellData;
    const cellPadding = 0;
    const cellSize = 10;
    const cellInner = 10;
    const x = column * cellSize;
    const y = row * cellSize;
    const fill = letter === "." ? "black" : "white";

    return (
        <g onClick={() => console.log("clicked")}>
            <rect
                x={x + cellPadding}
                y={y + cellPadding}
                width={cellInner}
                height={cellInner}
                fill={fill}
                stroke="black"
                strokeWidth={cellSize / 50}
            />
            {gridNums && (
                <text
                    x={x + cellPadding * 4 + 0.5}
                    y={y + cellPadding * 4 + 0.5}
                    textAnchor="start"
                    dominantBaseline="hanging"
                    style={{ fontsize: "13%", fill: "Black" }}
                >
                    {gridNums}
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

export default Cell;
