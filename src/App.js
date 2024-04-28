import React, { useState, useContext } from "react";
import {Logout, Moon, Sun} from "grommet-icons";
import {
  Box,
  Button,
  grommet,
  Grommet,
  Header,
  Page,
  Text,
} from "grommet";
import { deepMerge } from "grommet/utils";
import Routes from './Routes';
import {RouterProvider} from "react-router-dom";
import {getToken, setToken, clearToken} from "./utils"

const theme = deepMerge(grommet, {
  global: {
    colors: {
      brand: "#228BE6",
    },
    font: {
      family: "Roboto",
      size: "14px",
      height: "20px",
    },
  },
});

const AppBar = (props) => (
  <Header
    background="brand"
    pad={{ left: "medium", right: "small", vertical: "small" }}
    elevation="small"
    {...props}
  />
);


const App = () => {
  const [dark, setDark] = useState(false);

  console.log("App....")


  return (
    <Grommet theme={theme} full themeMode={dark ? "dark" : "light"}>
      <Page>
        <AppBar>
          <Text size="large">OAuth 2.0 Example Web Client</Text>
          <Box direction={"row"}>
          <Button
            a11yTitle={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            icon={dark ? <Moon /> : <Sun />}
            onClick={() => setDark(!dark)}
            tip={{
              content: (
                <Box
                  pad="small"
                  round="small"
                  background={dark ? "dark-1" : "light-3"}
                >
                  {dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                </Box>
              ),
              plain: true,
            }}
          />
          <Button plain icon={<Logout />} onClick={clearToken}></Button>
          </Box>
        </AppBar>
        <Box>
          <RouterProvider router={Routes()}></RouterProvider>
        </Box>
      </Page>
    </Grommet>
  );
};

export default App;
