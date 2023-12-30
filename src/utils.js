


// Set session token JWT
export function setToken(userToken) {
    localStorage.setItem('token', JSON.stringify(userToken));
}

// Get session token JWT
export function getToken() {
    const tokenString = localStorage.getItem('token');
    console.log("tokenString: ", tokenString);
    const userToken = JSON.parse(tokenString);
    return tokenString
    // return userToken?.token
}

// Remove session token
export function clearToken() {
    localStorage.removeItem("token")
    window.location.href = "/"
}
