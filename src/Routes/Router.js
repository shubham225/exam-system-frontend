import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./LoginPage";
import Root from "./Root";
import Home from "./Home";
import Dashboard from "./Dashboard";
import ExamPage from "./ExamPage";
import RegisterPage from "./RegisterPage";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Root />,
            children: [
                {
                    path: "/",
                    element: <Home />,
                    index: true
                },
                {
                    path: "/login",
                    element: <LoginPage />
                },
                {
                    path: "/register",
                    element: <RegisterPage />
                },
                {
                    path: "/exam",
                    element: <ExamPage />
                },
                {
                    path: "/dashboard",
                    element: <Dashboard />
                }
            ]
        }
    ]
);

export default router;