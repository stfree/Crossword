import { createRoot } from "react-dom/client";
import React from "react";
import App from "./components/App";
import "./main.css";
import {
    createBrowserRouter,
    RouterProvider,
    Link,
} from "react-router-dom";
import GameRoom from "./components/GameRoom/GameRoom"


const router = createBrowserRouter([
    {
        path: "/",
        element: <div>
        Home Page
        <div><Link to={"Game"}>Go To Game</Link></div>
        </div>
    },
    {
        path: "game",
        element: <GameRoom />
    }
])



const container = document.getElementById("app");
const root = createRoot(container);
root.render(<React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


// ReactDOM.createRoot(document.getElementById("app")).render(
//     <React.StrictMode>
//       <RouterProvider router={router} />
//     </React.StrictMode>
//   );
