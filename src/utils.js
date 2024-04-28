


// Set session token JWT
export function setToken(userToken) {
    localStorage.setItem('token', userToken);
}

// Get session token JWT
export function getToken() {
    return localStorage.getItem('token');
}

// Remove session token
export function clearToken() {
    localStorage.removeItem("token")
    window.location.href = "/"
}
