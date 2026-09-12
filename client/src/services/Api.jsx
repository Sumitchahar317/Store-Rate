let rawBase = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
rawBase = rawBase.replace(/\/+$/, "");
if (!rawBase.endsWith("/api")) {
    rawBase += "/api";
}
const BASE_URL = rawBase;

export const apiRequest = async(endpoint, options = {}) => {
    const token = localStorage.getItem("token")

    const headers ={
        "Content-Type" : "application/json",
        ...(options.headers || {})
    }

    if(token) headers["Authorization"] = `Bearer ${token}`

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers
    })

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.err || data.error)
    }
    return data

}

export default apiRequest
