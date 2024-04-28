
import React, {Component} from 'react';
import {getRESTApi} from "./rest_call";
import {setToken} from "./utils";

class AuthCallback extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    componentDidMount() {
        console.log("componentDidMount URL ", window.location)
        // Get the search parameters and values from the URL
        let params = new URLSearchParams(window.location.search.substring(1));
        console.log("URL code: ", params.get("code"))

        let url = "/auth/token" + window.location.search
        getRESTApi(url)
            .then(response => response.json())
            .then((response) => {
                console.log("AuthCallback: componentDidMount: getRESTApi ", response)
                setToken(response['access_token'])
                window.location.href = "/"
            })
            .catch((err) => {
                console.log("exception: ", err)
            })

    }

    componentWillUnmount() {
        console.log("componentWillUnmount ")
    }

    render() {
        console.log("render: AuthCallback: this.props: ", this.props);


        return (<div></div>);
    }
}

export default AuthCallback;
