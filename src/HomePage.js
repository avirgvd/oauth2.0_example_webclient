import {Component} from "react";
import {Box, Card, CardBody, Header, Heading} from "grommet";
import {clearToken, getToken, setToken} from "./utils";
import {RouterProvider} from "react-router-dom";
import Routes from "./Routes";
import Login from "./Login";
import {getRESTApi} from "./rest_call";

class HomePage extends Component {

    componentDidMount() {
        console.log("HomePage: componentDidMount")
        const token = getToken();

        // Check for session token on web client start or page refresh.
        // Proceed if the token is present else redirect to login page
        // The login page sets the token to session storage upon successful login using Google Sign-in or any other method.
        // On successful login the page will be redirected to web client to go through this check again, this time with new token.
        if(!token) {
            window.location = "/login"
        }
        else {
            let url = "/api/home"
            getRESTApi(url)
                .then((response) => {
                    console.log("Response: ", response)
                    if(response.status === 401){
                        // if server responds with unauthorized status, ask user to login
                        clearToken()
                        window.location.href = "/login"
                    }
                })
                .catch((err) => {
                    console.log("Exception ", err)
                })
        }

    }

    render() {

        return (
            <Box align={"center"} justify={"start"}>
                <Header>
                    <Heading level={3}>Home Page</Heading>
                </Header>
                <Box direction={"row-responsive"} gap={"medium"} pad={"medium"}>
                    <Card height="small" width="small" background="light-1" onClick={() => {
                        window.location.href = "/"
                    }}>
                        <CardBody justify={"center"} pad="medium"></CardBody>
                    </Card>
                </Box>
            </Box>
        );
    }
}

export default HomePage;