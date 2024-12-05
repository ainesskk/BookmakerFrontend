export async function setToken(token) {
    localStorage.setItem("token", token);
}
export async function getToken() {
    return localStorage.getItem("token");
}
