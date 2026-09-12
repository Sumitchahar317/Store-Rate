const BASE_URL = import.meta.env.VITE_API_URL;

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
