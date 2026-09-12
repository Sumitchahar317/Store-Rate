import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/Api";
import SignupForm from "../component/SignupForm"

const Signup = () => {

    const navigate = useNavigate()

    const [data, setData] = useState({
        name : "",
        email : "",
        password : "",
        address : ""
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({})
    const [serverError, setServerError] = useState(false)

    const validateFields = (name, value)=>{
        let error = ""
        if(name === "name"){
            if(value.length < 20 || value.length > 60)
                error = "Name must be between 20 and 60 characters"
        }
        else if(name === "email"){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if(!emailRegex.test(value))
                error = "Please provide a valid email"
        }
        else if(name === "password"){
            const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
            if(!passwordRegex.test(value))
                error = "8-16 chars, at least one uppercase letter, and one special character"
        }
        else{
            if(!value.trim()){
                error = "Address is required"
            }else if(value.length > 400){
                error ="Address must not exceed 400 characters"
            }
        }
        return error
    }

    const handelChange = (e) =>{
        const {name, value} = e.target

        setData((prev)=>({
            ...prev, [name]:value
        }))
        const error = validateFields(name, value)
        setError((prev)=>({...prev, [name]: error}))
    }

    const handelSubmit = async(e)=>{
        e.preventDefault()
        setServerError("")

        const newError = {}

        Object.keys(data).forEach((key)=>{
            const err = validateFields(key, data[key])
            if(err)
                newError[key] = err
        })

        if(Object.keys(newError).length > 0){
            setError(newError)
            return
        }
        setLoading(true)
        try{
            await apiRequest("/auth/signup", {
                method : "POST",
                body : JSON.stringify(data)
            })
            navigate("/login",{state : {message : "Account created! Please log in."}})

        }catch(err){
            setServerError(err.message)
        }finally{
            setLoading(false)
        }
    }

  return (
    <SignupForm
      data={data}
      error={error}
      serverError={serverError}
      loading={loading}
      onChange={handelChange}
      onSubmit={handelSubmit}
    />
  )
}

export default Signup
