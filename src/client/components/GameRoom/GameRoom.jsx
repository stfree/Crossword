import { React, useEffect, useCallback, useState } from "react";
import { NormalModuleReplacementPlugin } from "webpack";
import { useParams } from "react-router-dom";
import "./App.css";
import Board from "./Board";
import ClueList from "../ClueList/ClueList";

function GameRoom() {
    const { date } = useParams();
    const [board, setBoard] = useState([]);
    const [focusArea, setFocusArea] = useState({
        direction: "across"
    });

    // 1983-10-10 - original test
    // 1994 " " works
    // 1995 no work <-- took a pic
    useEffect(() => {
        fetch(`/createGame?date=${date} `)
            .then((data) => {
                if (data.status === 304 || data.status === 200) {
                    data.json().then(({ data }) => {
                        setBoard(data);
                        console.log(data);
                    });
                }
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);

    useEffect(() => {
        console.log(focusArea);
    }, [board]);

    const handleKeyboard = useCallback((event) => {
        console.log(event);
    });

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);
        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        };
    }, [handleKeyboard]);

    function registerGuess(e, focusArea) {
        console.log(e.key, focusArea);

        if (e.key.toUpperCase() === "BACKSPACE") {
            e.key = "";
            processGuess(e, focusArea);
            const prev = prevPosition(focusArea.position);
            setFocusArea({
                ...focusArea,
                position: prev,
                range: board.cells[prev][`${focusArea.direction}Member`]
            });
        }

        if (e.key.toUpperCase().match(/^[A-Z]$/)) {
            processGuess(e, focusArea);
            const next = nextPosition(board.cells[focusArea.position].index);

            setFocusArea({
                ...focusArea,
                position: next,
                range: board.cells[next][`${focusArea.direction}Member`]
            });
        }

        if (e.key.toUpperCase() === "TAB") {
            e.preventDefault();
            const nextOrPrev = e.shiftKey ? "Prev" : "Next";

            e.key = board.cells[focusArea.position].guess;

            const coord = board.cells[focusArea.position].index;
            let next =
                board.memberIndexMap[focusArea.direction][
                    board.cells[coord][`${focusArea.direction}${nextOrPrev}`]
                ];
            if (next === undefined) {
                if (board.cells[coord][`${focusArea.direction}Member`] === 1) {
                    next =
                        board.cells[board.cells.length - 1][
                            `${focusArea.direction}Start`
                        ];
                } else {
                    next = board.cells[0][`${focusArea.direction}Start`];
                }
            }

            setFocusArea({
                ...focusArea,
                position: next,
                range: board.cells[next][`${focusArea.direction}Member`]
            });
            processGuess(e, focusArea);
        }

        if (e.key.toUpperCase() === "ALT") {
            e.preventDefault();
            e.key = board.cells[focusArea.position].guess;
            handleNextClick();
            processGuess(e, focusArea);
        }

        if (e.key === "ArrowUp") {
            arrowKeyChanges(e, -15);
        }

        if (e.key === "ArrowDown") {
            arrowKeyChanges(e, +15);
        }

        if (e.key === "ArrowRight") {
            arrowKeyChanges(e, 1);
        }

        if (e.key === "ArrowLeft") {
            arrowKeyChanges(e, -1);
        }
    }

    function arrowKeyChanges(e, n) {
        e.key = board.cells[focusArea.position].guess;
        let next = focusArea.position + n;

        while (
            board.cells[next].letter === "." &&
            next < board.cells.length &&
            next > -1
        ) {
            next += n;
        }
        if (next > -1 && next < board.cells.length) {
            setFocusArea({
                ...focusArea,
                position: next,
                range: board.cells[next][`${focusArea.direction}Member`]
            });
            processGuess(e, focusArea);
        }
    }

    function processGuess(e, focusCoords) {
        const newBoard = board.cells.map((cell, index) => {
            if (index === focusCoords.position) {
                cell.guess = e.key.toUpperCase();
            }

            return cell;
        });
        setBoard({ ...board, cells: newBoard });
    }

    function nextPosition(coord) {
        const increment =
            focusArea.direction === "across" ? 1 : board.size.cols;
        let newCoord = coord + increment;

        if (coord === board.cells.length - 1) {
            return 0;
        }
        if (
            board.cells[newCoord] === undefined ||
            board.cells[newCoord].letter === "."
        ) {
            const next = board.cells[coord][`${focusArea.direction}Next`];
            newCoord = board.memberIndexMap[focusArea.direction][next];
        }
        return newCoord;
    }

    function prevPosition(coord) {
        const increment =
            focusArea.direction === "across" ? 1 : board.size.cols;
        let newCoord = coord - increment;

        if (coord === 0) {
            return board.cells.length - 1;
        }
        if (
            board.cells[newCoord] === undefined ||
            board.cells[newCoord].letter === "."
        ) {
            const Prev = board.cells[coord][`${focusArea.direction}Prev`];

            newCoord = board.memberIndexMap[focusArea.direction][Prev];

            const Answer =
                board.cells[newCoord][`${focusArea.direction}Answer`];

            newCoord = newCoord + (Answer.length - 1) * increment;
        }
        return newCoord;
    }

    function changeFocus() {
        handleNextClick();
    }

    function getClue() {
        return focusArea.direction === "across"
            ? board.cells[focusArea.position].acrossClue
            : board.cells[focusArea.position].downClue;
    }

    function toggleClue(direction) {
        return direction === "across" ? "down" : "across";
    }

    function handleNextClick() {
        const direction = toggleClue(focusArea.direction);
        setFocusArea({
            ...focusArea,
            range:
                direction === "across"
                    ? board.cells[focusArea.position].acrossMember
                    : board.cells[focusArea.position].downMember,
            direction: direction
        });
        setBoard({ ...board });
    }

    function onNewCell(cellData) {
        const newRange =
            focusArea.direction === "across"
                ? cellData.acrossMember
                : cellData.downMember;
        setFocusArea({
            direction: focusArea.direction,
            position: cellData.index,
            range: newRange
        });
    }

    function onClueClick(direction, range) {
        let position;
        board.cells.map((cell) => {
            if (cell[`${direction}Member`] === range) {
                position = cell[`${direction}Start`];
            }
        });

        setFocusArea({
            direction: direction,
            position: position,
            range: range
        });
    }

    function checkBoard() {
        const newCells = board.cells.map((cell) => {
            if (cell.guess === cell.letter) {
                cell.checked = true;
            }
            return cell;
        });
        setBoard({ ...board, cells: newCells });
    }

    function checkClue() {
        const newCells = board.cells.map((cell) => {
            if (cell[`${focusArea.direction}Member`] === focusArea.range) {
                cell.checked = true;
            }
            return cell;
        });
        setBoard({ ...board, cells: newCells });
    }

    function checkCell() {
        const guess = board.cells[focusArea.position].guess;
        const letter = board.cells[focusArea.position].letter;
        const isChecked = board.cells[focusArea.position].checked;

        const newCells = board.cells.map((cell) => cell);
        if (!isChecked) {
            newCells[focusArea.position].checked = true;
            setBoard({ ...board, cells: newCells });
        }
    }

    function checkWin() {
        let i = 0;
        let result = true;

        while (result && i < board.cells.length) {
            if (
                board.cells[i].letter !== "." &&
                board.cells[i].letter !== board.cells[i].guess
            ) {
                result = false;
            }
            i += 1;
        }
        return result ? alert("winner") : alert("almost");
    }

    return (
        <div className="body">
            <div className="main">
                <div className="header">
                    <img
                        src="/images/eustace-400.webp"
                        width="200"
                        alt="Banner"
                    />
                    <div className="title">
                        <span className="subTitle">The New Jersey Times </span>
                        <span>Crossword</span>
                    </div>
                    <div className="settings">
                        <span>Settings </span>
                        <button
                            type="button"
                            onClick={
                                focusArea.position > -1
                                    ? () => checkWin()
                                    : () => console.log("no")
                            }
                        >
                            Check win
                        </button>

                        <button
                            type="button"
                            onClick={
                                focusArea.position > -1
                                    ? () => checkCell()
                                    : () => console.log("no")
                            }
                        >
                            Check Cell
                        </button>
                        <button
                            type="button"
                            onClick={
                                focusArea.position > -1
                                    ? () => checkClue()
                                    : () => console.log("no")
                            }
                        >
                            Check Clue
                        </button>
                        <button
                            type="button"
                            onClick={
                                focusArea.position > -1
                                    ? () => checkBoard()
                                    : () => console.log("no")
                            }
                        >
                            Check Board
                        </button>
                    </div>
                </div>
                <div className="clue">
                    <span>
                        <h1>{focusArea.position > -1 && getClue()}</h1>
                    </span>
                </div>
                <div className="canvas">
                    <div className="crossword-grid">
                        {board.cells && (
                            <Board
                                boardData={board}
                                registerGuess={registerGuess}
                                onKeyDown={handleKeyboard}
                                focusArea={focusArea}
                                changeFocus={changeFocus}
                                onNewCell={onNewCell}
                            />
                        )}
                    </div>
                    <div className="clueList">
                        <div className="across">
                            <h1>Across</h1>
                            <div className="list">
                                <ul>
                                    {board.clueArrayAcross && (
                                        <ClueList
                                            clueArray={board.clueArrayAcross}
                                            direction={"across"}
                                            cells={board.cells}
                                            focusArea={focusArea}
                                            onClueClick={onClueClick}
                                            registerGuess={registerGuess}
                                        />
                                    )}
                                </ul>
                            </div>
                        </div>
                        <div className="down">
                            <h1>Down</h1>
                            <div className="list">
                                <ul>
                                    {board.clueArrayDown && (
                                        <ClueList
                                            clueArray={board.clueArrayDown}
                                            direction={"down"}
                                            cells={board.cells}
                                            focusArea={focusArea}
                                            onClueClick={onClueClick}
                                            registerGuess={registerGuess}
                                        />
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GameRoom;
