/*
Code taken from Form example from: https://design-system.hpe.design/templates/forms

 */

import React, {Component} from 'react';
import {
    Box,
    Button,
    Form,
    FormField,
    Header,
    Footer,
    Text,
    TextInput,
} from 'grommet';

import GoogleAuth from "./components/GoogleSignin"

import {FormClose, Google, FormNext, CircleAlert} from 'grommet-icons';
import version from "./Version";
import {getToken, setToken} from "./utils";
import {RouterProvider} from "react-router-dom";
import Routes from "./Routes";
import {getRESTApi} from "./rest_call";

const userValidation = [
    // {
    //   regexp: new RegExp('[^@ \\t\\r\\n]+@'),
    //   message: 'Enter a valid email address.',
    //   status: 'error',
    // },
    // {
    //   regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    //   message: 'Enter a valid email address.',
    //   status: 'error',
    // },
    // {
    //   regexp: new RegExp('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+'),
    //   message: 'Enter a valid email address.',
    //   status: 'error',
    // },
];

const passwordRequirements = [
    {
        regexp: new RegExp('(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[#?!@$ %^&*-]).{8,}'),
        message: 'Password requirements not met.',
        status: 'error',
    },
];

class Login extends Component {
    constructor(props) {
        super(props);
        this._onSubmit = this._onSubmit.bind(this);
        this.onGoogleSignIn = this.onGoogleSignIn.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onLoginSuccess = this.onLoginSuccess.bind(this);
        this.onLoginFailure = this.onLoginFailure.bind(this);

        this.state = {
            creds: {username: "", password: ""},
            size: 'small',
            credentialError: false,
            showForgotPassword: false,
            redirect: "/deploy",
            loginSucceeded: false
        };
    }

    componentDidMount() {
        console.log("componentDidMount")
        const token = getToken();
        // Check for session token on web client start or page refresh.
        // Proceed to show login page only if the token is missing.
        if(token) {
            // if token found then redirect to home page
            window.location = "/"
        }
    }

    componentWillUnmount() {
        console.log("componentWillUnmount")
    }

    onChange(values) {
        // console.log("Values: ", values);

        this.setState({creds: values});
    }

    onLoginSuccess(){

    }

    onLoginFailure(){

    }

    onGoogleSignIn() {

        let url = '/api/auth'
        getRESTApi(url)
            .then(response => response.json())
            .then((response ) => {
                console.log("onGoogleSignIn: response: ", response);
                window.location.assign(response["url"]);
            })
            .catch((err) => {
                window.alert("Failed to connect to server: " + err.statusText);
                console.log("onGoogleSignIn: exception: ", err);
            })
    }


    _onSubmit(event) {
        event.preventDefault();
        console.log("_onSubmit: ")
        this.props.setToken("abc")
        window.location.href = "/"
    }

    render() {
        console.log("render: Login: this.props: ", this.props);

        let notif = (<Box overflow="auto" align="center" flex="grow" background={{"color":"status-error","opacity":"medium"}} />);

        return (
            <Box
                id="loginform"
                justify="stretch"
                align="stretch"
                fill
            >
                <Box
                    align="center"
                    justify="center"
                    pad="large"
                >
                    <Header
                        align="center"
                        gap="xxsmall"
                        direction="column"
                        pad={{horizontal: 'small', vertical: 'large'}}
                    >
                        <Text size="xxlarge" weight="bold">
                            Login
                        </Text>
                        <Text size="small">
                            v{version.version}
                        </Text>
                    </Header>
                    <Form
                        value={this.state.creds}
                        onChange={this.onChange}
                        messages={{
                            required: 'This is a required field.',
                        }}
                        onSubmit={this._onSubmit}
                    >
                        <FormField
                            label="User"
                            name="username"
                            htmlFor="user-sign-in"
                            validate={userValidation}
                        >
                            <TextInput
                                id="user-sign-in"
                                name="username"
                                autoFocus={true}
                                value={this.state.creds.username}
                                placeholder="Enter user name"
                                type="text"
                            />
                        </FormField>
                        <FormField
                            label="Password"
                            htmlFor="password-sign-in"
                            name="password"
                        >
                            <TextInput
                                id="password-sign-in"
                                name="password"
                                value={this.state.creds.password}
                                placeholder="Enter your password"
                                type="password"
                            />
                        </FormField>
                        <Box
                            justify="stretch"
                            direction="row"
                            margin={{top: 'medium', bottom: 'small'}}
                            fill={"horizontal"}
                            round="xsmall" border={{"color":"border","size":"small"}}
                        >
                            <Button
                                plain
                                margin={"xsmall"}
                                label={"Sign in with Google"}
                                icon={<Google />}
                                onClick={this.onGoogleSignIn}
                            />
                        </Box>
                        <Box
                            justify="stretch"
                            direction="row"
                            margin={{top: 'medium', bottom: 'small'}}
                            fill={"horizontal"}
                        >
                        </Box>
                        {notif}
                        <Box
                            justify="around"
                            direction="row"
                            margin={{top: 'medium', bottom: 'small'}}
                        >
                            <Button
                                label="Login"
                                icon={<FormNext/>}
                                reverse
                                align="start"
                                primary
                                margin="small"
                                type="submit"
                            />
                        </Box>
                    </Form>
                </Box>
            </Box>
        );
    }
}

export default Login;
