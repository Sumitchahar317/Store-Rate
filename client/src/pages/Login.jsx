import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import LoginForm from "../component/LoginForm"

const Login = () => {

  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Both fields are required")
      return;
    }
    setLoading(true)

    try {
      const res = await login(email, password)
      if (!res.success) {
        setError(res.err)
        return
      }

      const role = res.user?.role

      if (role === "ADMIN") {
        navigate("/admin", { replace: true })
      }
      else if (role === "STORE_OWNER" || role === "STORE_ADMIN") {
        navigate("/owner", { replace: true })
      }
      else {
        navigate("/stores", { replace: true })
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <LoginForm
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
      loading={loading}
      handleSubmit={handleSubmit}
      successMessage={location.state?.message}
    />
  );
};

export default Login
