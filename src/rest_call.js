


import fetch from "isomorphic-fetch";
import {getToken} from "./utils";

let _hostname;
if (process.env.NODE_ENV === 'production') {
    _hostname  = 'localhost:5000';
}
else {
    _hostname  = 'localhost:5000';
}

let _headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export function getRESTApi(url, callback) {

    console.log('getRESTApi URL: ', 'http://' + _hostname + url);

    let token = getToken()
    _headers['Authorization'] = 'Bearer ' + token?token:'';

    console.log("_headers: ", _headers)

    let options = {
        method: "GET",
        headers: _headers
    };

    return rest_call(url, options);

}

export function postRESTApi(url, reqBody) {

    console.log("postRESTApi: url:", url);
    console.log("postRESTApi: reqBody:", reqBody);

    let token = getToken()
    _headers['Authorization'] = 'Bearer ' + token?token:'';

    console.log("_headers: ", _headers)

    let options = {
        method: "POST",
        headers: _headers,
        body: JSON.stringify(reqBody)
    };

    return rest_call(url, options);
}

function rest_call(uri, options) {
    console.log("rest_call: url: ", uri)

    let url = 'http://' + _hostname + uri;
    console.log(url)
    return fetch(url, options)
}
