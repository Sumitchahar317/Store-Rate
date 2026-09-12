import { createContext, useContext, useEffect, useState } from 'react'
import apiRequest from '../services/Api'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        // check if token and user exist in storage on initial load
        const savedToken = localStorage.getItem("token")
        const savedUser = localStorage.getItem("user")

        if(savedToken && savedUser){
            try{
                setToken(savedToken)
                setUser(JSON.parse(savedUser))
            }catch{
                // In case of corroupted JSON in local Storage
                localStorage.removeItem("token")
                localStorage.removeItem("user")
            }
        }
        setLoading(false)
    }, [])

    const login = async (email, password) =>{
        try{
            const res = await apiRequest("/auth/login", {
                method  : "POST",
                body : JSON.stringify({email, password})
            })

            // save to localStore
            localStorage.setItem("token", res.token)
            localStorage.setItem("user", JSON.stringify(res.user))

            // update react state
            setToken(res.token)
            setUser(res.user)

            return {success : true, user : res.user}
        }catch(err){
            return {success : false, error: err.message}
        }
    }

    const logout = ()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null)
        setUser(null)
    }

  return (
   <AuthContext.Provider value={{user, token, role: user?.role, login, logout, loading}}>
    {!loading && children}
   </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
export default AuthContext
