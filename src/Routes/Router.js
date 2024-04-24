import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Root from "./Root";
import Home from "./Home";
import Register from "./Register";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Root/>,
            children: [
                {
                    path: "/",
                    element: <Login/>,
                    index: true
                },
                {
                    path: "/register",
                    element: <Register />,
                    index: true
                },
                {
                    path: "/home",
                    element: <Home/>
                }
            ]
        }
    ]
);

export default router;