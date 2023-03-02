import { React, useEffect, useCallback, useState } from "react";
import { NormalModuleReplacementPlugin } from "webpack";
import "./App.css";
import Board from "./Board";
import ClueList from "../ClueList/ClueList";

// in the middle of removing clue/setClue state
// need to move onNewCell up to gameRoom - add clue to focusArea or nah?

function GameRoom() {
    const [board, setBoard] = useState([]);
    const [focusArea, setFocusArea] = useState({
        direction: "across"
    });

    useEffect(() => {
        fetch("/createGame?date=1983-10-10")
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
            const range =
                focusArea.direction === "across"
                    ? "acrossMember"
                    : "downMember";
            setFocusArea({
                ...focusArea,
                position: prev,
                range: board.cells[prev][range]
            });
        }

        if (e.key.toUpperCase().match(/^[A-Z]$/)) {
            processGuess(e, focusArea);
            const next = nextPosition(board.cells[focusArea.position].index);
            const range =
                focusArea.direction === "across"
                    ? "acrossMember"
                    : "downMember";
            setFocusArea({
                ...focusArea,
                position: next,
                range: board.cells[next][range]
            });
        }

        if (e.key.toUpperCase() === "TAB") {
            e.preventDefault();
            e.key = board.cells[focusArea.position].guess;
            processGuess(e, focusArea);
            handleNextClick();
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

        while (board.cells[newCoord].letter === ".") {
            newCoord += increment;
        }
        return newCoord;
    }

    function prevPosition(coord) {
        const decrement =
            focusArea.direction === "across" ? 1 : board.size.cols;

        let newCoord = coord - decrement;

        if (coord <= 0) {
            return 0;
        }
        while (board.cells[newCoord].letter === ".") {
            newCoord -= decrement;
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
                if (cell.guess === cell.letter) {
                    cell.checked = true;
                }
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
        if (!isChecked && guess === letter) {
            newCells[focusArea.position].checked = true;
            setBoard({ ...board, cells: newCells });
        }
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
                        <span>The New Jersey Times </span>
                        <span>Crossword</span>
                    </div>
                    <div className="settings">
                        <span>Settings </span>
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
