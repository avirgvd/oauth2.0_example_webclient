import * as React from "react";

import {
    createBrowserRouter
} from "react-router-dom";

import HomePage from "./HomePage";
import Login from "./Login";
import AuthCallback from "./AuthCallback";

export default function () {
    console.log("Routes1")
    let prefix = "/";

    return createBrowserRouter(
        [
            {
                path: `${prefix}/`,
                element: <HomePage/>
            },
            {
                path: `${prefix}/auth/callback`,
                element: <AuthCallback/>
            },
            {
                path: `${prefix}/login`,
                element: <Login/>
            },
            {
                path: `${prefix}/home`,
                element: <HomePage/>
            }
        ]
    );
}
