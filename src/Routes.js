import * as React from "react";

import {
    createBrowserRouter,
} from "react-router-dom";

import HomePage from "./HomePage";
import Login from "./Login";

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
                path: `${prefix}/login`,
                element: <Login/>
            },
            {
                path: `${prefix}/home`,
                element: <HomePage/>
            }
        ]
    );
    // return (
    //   // <Routes id="routesbox" as="main" overflow="auto" flex="grow" fill="vertical" align="center" justify="between" direction="row" >
    //   <Box>
    //     <Route path={`/`} component={HomePage} />
    //     <Route exact path={`/`} component={HomePage} />
    //     <Route path={`/mapview`} component={Playground} />
    //   </Box>
    // );
}
