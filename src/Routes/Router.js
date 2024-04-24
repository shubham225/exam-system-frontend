import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "./Authentication";
import Root from "./Root";
import Home from "./Home";

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
                    path: "/home",
                    element: <Home/>
                }
            ]
        }
    ]
);

export default router;