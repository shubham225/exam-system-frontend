import React from "react";
import { createBrowserRouter} from "react-router-dom";

import Login from "./Login";
import Root from "./Root";
import Home from "./Home";
import Dashboard from "./Dashboard";
import Exams from "./Exams";
import Register from "./Register";
import Exam from "./Exam";
import Module from "./Module";
import ProtectedRoutes from "./ProtectedRoutes";
import Results from "./Results";

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
                    element: <Login />
                },
                {
                    path: "/register",
                    element: <Register />
                },
                {
                    element: <ProtectedRoutes />,
                    children: [
                        {
                            path: "/dashboard",
                            element: <Dashboard />
                        },
                        {
                            path: "/exam",
                            element: <Exams />
                        },
                        {
                            path: "exam/:id",
                            element: <Exam />
                        },
                        {
                            path: "module/:id",
                            element: <Module />
                        },
                        {
                            path: "results",
                            element: <Results />
                        }
                    ]
                },
                {
                    path: "*",
                    element: <Login />
                }
            ]
        }
    ]
);

export default router;