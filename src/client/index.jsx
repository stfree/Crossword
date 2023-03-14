import { createRoot } from "react-dom/client";

import React from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import App from "./components/App";
import "./main.css";
import GameRoom from "./components/GameRoom/GameRoom";
import Landing from "./components/Landing/Landing";

// let date = {
//     year: 1994,
//     month: 10,
//     day: 10
// };

// function getDate() {
//     const { year, month, day } = date;
//     return `Game/${year}-${month}-${day}`;
// }

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing />
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
