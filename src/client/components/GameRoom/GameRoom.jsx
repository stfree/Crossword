import { React, useEffect, useCallback, useState } from "react";
import { NormalModuleReplacementPlugin } from "webpack";
import "./App.css";
import Board from "./Board";

function GameRoom() {
    const [board, setBoard] = useState([]);
    const [clue, setClue] = useState(["--clues here--"]);
    const [focusArea, setFocusArea] = useState({
        direction: "across"
    });

    useEffect(() => {
        fetch("/createGame?date=1983-10-10")
            .then((data) => {
                if (data.status === 304 || data.status === 200) {
                    data.json().then(({ data }) => {
                        setBoard(data);
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
            const prev = prevPosition(focusArea.position - 1);
            setFocusArea({
                position: prev,
                range: board.cells[prev].across.focusRange
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
        if (coord <= 0) {
            return 0;
        }
        while (board.cells[coord].letter === ".") {
            coord -= 1;
        }
        return coord;
    }

    function changeFocus() {
        handleNextClick();
        setClue(
            direction === "across"
                ? board.cells[focusArea.position].acrossClue
                : board.cells[focusArea.position].downClue
        );
    }

    function toggleClue() {
        return direction === "across" ? "down" : "across";
    }

    function handleNextClick() {
        setDirection(toggleClue());
        setFocusArea({
            ...focusArea,
            range:
                direction === "across"
                    ? board.cells[focusArea.position].downMember
                    : board.cells[focusArea.position].acrossMember,
            direction: direction === "across" ? "down" : "across"
        });
        setBoard({ ...board });
    }

    return (
        <div className="body">
            <div className="main">
                <div className="header">
                    <img src="/images/eustace-400.webp" width="200"></img>
                    <div className="title">
                        <span>The New Jersey Times </span>
                        <span>Crossword</span>
                    </div>
                    <div className="settings">
                        <span>Settings</span>
                    </div>
                </div>
                <div className="clue">
                    <span>
                        <h1>{clue}</h1>
                    </span>
                </div>
                <div className="canvas">
                    <div className="crossword-grid">
                        {board.cells && (
                            <Board
                                boardData={board}
                                setBoardData={setBoard}
                                setClue={setClue}
                                registerGuess={registerGuess}
                                onKeyDown={handleKeyboard}
                                focusArea={focusArea}
                                setFocusArea={setFocusArea}
                                changeFocus={changeFocus}
                            />
                        )}
                    </div>
                    <div className="clueList">
                        <div className="across">
                            <h1>Across</h1>
                            <div className="list">
                                <ul>
                                    {board.clueArrayAcross &&
                                        board.clueArrayAcross.map((clue) => (
                                            <li>{clue}</li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                        <div className="down">
                            <h1>Down</h1>
                            <div className="list">
                                <ul>
                                    {board.clueArrayDown &&
                                        board.clueArrayDown.map((clue) => (
                                            <li>{clue}</li>
                                        ))}
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
