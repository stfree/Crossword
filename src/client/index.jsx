import { createRoot } from "react-dom/client";

import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import App from "./components/App";
import "./main.css";
import GameRoom from "./components/GameRoom/GameRoom";

let date = {
    year: 1994,
    month: 10,
    day: 10
};

function getDate() {
    return `Game/${date.year}-${date.month}-${date.day}`;
}

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <h1>Home Page</h1>
                Year:
                <input
                    type="number"
                    id="pickyear"
                    min="1976"
                    max="2015"
                    onChange={(e) => {
                        date.year = e.target.valueAsNumber;
                    }}
                ></input>
                Month:
                <input
                    type="number"
                    id="pickmonth"
                    min="01"
                    max="12"
                    onChange={(e) => {
                        date.month = e.target.valueAsNumber;
                    }}
                ></input>
                Day:
                <input
                    type="number"
                    id="pickday"
                    min="01"
                    max="30"
                    onChange={(e) => {
                        date.day = e.target.valueAsNumber;
                        console.log(date);
                    }}
                ></input>
                <div>
                    <Link to={getDate()}>Go To Game</Link>
                </div>
            </div>
        )
    },
    {
        path: "game/:date",
        element: <GameRoom />
    }
]);

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// ReactDOM.createRoot(document.getElementById("app")).render(
//     <React.StrictMode>
//       <RouterProvider router={router} />
//     </React.StrictMode>
//   );
