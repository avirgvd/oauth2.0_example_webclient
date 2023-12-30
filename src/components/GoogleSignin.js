

//External imports
import { useEffect, useRef } from 'react'
import {getToken, setToken, clearToken} from "../utils"

const loadScript = (src) =>
    new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) return resolve()
        const script = document.createElement('script')
        script.src = src
        script.onload = () => resolve()
        script.onerror = (err) => reject(err)
        document.body.appendChild(script)
    })

const GoogleAuth = () => {
    // Refer Google Identity API documentation from https://developers.google.com/identity/gsi/web/reference/js-reference#ux_mode

    const googleButton = useRef(null);

    useEffect(() => {
        const src = 'https://accounts.google.com/gsi/client'
        const id = "741821176434-eth4815ljg0vdc8ekltui0epre9il2md.apps.googleusercontent.com"

        // Load Google sign-in page by redirecting the page.
        loadScript(src)
            .then(() => {
                /*global google*/
                console.log(google)
                google.accounts.id.initialize({
                    client_id: id,
                    ux_mode: "popup",
                    login_uri: window.location,
                    callback: handleCredentialResponse,
                })
                google.accounts.id.renderButton(
                    googleButton.current,
                    { theme: 'outline', size: 'large' }
                )
            })
            .catch(console.error)

        return () => {
            const scriptTag = document.querySelector(`script[src="${src}"]`)
            if (scriptTag) document.body.removeChild(scriptTag)
        }
    }, [])

    function handleCredentialResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        setToken(response.credential);
        window.location = "/"
    }

    return (
        <div ref={googleButton}></div>
    )
}

export default GoogleAuth
