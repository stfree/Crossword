import { createRoot } from "react-dom/client";
import { React, useState } from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import App from "./components/App";
import "./main.css";
import GameRoom from "./components/GameRoom/GameRoom";
import Landing from "./components/Landing/Landing";

const [setDate, date] = useState({ year: "2001", month: "01", day: "01" });

const router = createBrowserRouter([
    {
        path: "/",
        element: <Landing date={date} setDate={setDate} />
    },
    {
        path: "game",
        element: <GameRoom date={date} />
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
