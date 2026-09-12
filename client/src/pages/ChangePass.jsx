import React, { useState } from 'react'
import { apiRequest } from '../services/Api'
import ChangePassForm from '../component/ChangePassForm';

const ChangePass = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [feedback , setFeedback] = useState({error : "", success : ""})

    const handelSubmit = async(e) =>{
    e.preventDefault();
        setFeedback({error : "", success : ""})

    if(!oldPassword){
      setFeedback({error : "Please enter your current password", success : ""})
      return;
    }

    if(!newPassword || !confirmPassword){
      setFeedback({error : "Please provide both new password and confirmation", success : ""})
      return ;
    }

    if(newPassword !== confirmPassword){
      setFeedback({error : "New password and confirm password do not match", success : ""})
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
    if(!passwordRegex.test(newPassword)){
      setFeedback({
        error : "Password must be 8-16 characters long and include at least one upper case and one special character",
        success : "",
      })
      return ;
    }

    setLoading(true);
    try{
      await apiRequest("/auth/changePassword", {
        method : "POST",
        body : JSON.stringify({oldPassword, newPassword}),
      })

      setFeedback({error : "", success : "Password updated successfully"})
      setOldPassword("")
      setNewPassword("")
      setConfirmPassword("")
    }
    catch(err){
            setFeedback({error : err.message, success : ""})   
    }finally{
      setLoading(false);
    }
    }

  return (
    <ChangePassForm
      oldPassword={oldPassword}
      setOldPassword={setOldPassword}
      newPassword={newPassword}
      setNewPassword={setNewPassword}
      confirmPassword={confirmPassword}
      setConfirmPassword={setConfirmPassword}
      loading={loading}
      feedback={feedback}
      handleSubmit={handelSubmit}
    />
  );
};

export default ChangePass
