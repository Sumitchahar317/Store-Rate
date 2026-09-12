const validator = require("validator");

const validPass = (password) =>{

    if (typeof password !== "string") 
        return false;

    if (!validator.isLength(password, { min: 8, max: 16 })) 
        return false;
    

    return validator.isStrongPassword(password,{
        minLength : 8,
        minUppercase : 1,
        minSymbols : 1,
        minLowercase : 0,
        minNumbers : 0,
    })
}

exports.validateSignUp = (req, res, next)=>{
    const {name, email, address, password} = req.body;

    if(!name || !email || !address || !password){
        return res.status(400).json({err : "Please provide all required fields"});
    }
    if (!validator.isLength(name, { min: 20, max: 60 })){
        return res.status(400).json({
             err: "Name must be between 20 and 60 characters long.",
        })
    }
        
    if(!validator.isEmail(email)){
        return res.status(400).json({err : "email address is not valid"})
    }

     if (!validator.isLength(address, {max: 400 })){
        return res.status(400).json({
             err: "Address is too long should not exceed 400 characters",
        })
    }

    if (!validPass(password)) {
        return res.status(400).json({ err: "Password is not strong" });
    }

    next();
}

exports.validateNewPassword = (req, res, next)=>{
    const {oldPassword, newPassword} = req.body ;

    if(!oldPassword || !newPassword){
        return res.status(400).json({err : "Enter both password(old and new)"});
    }
    if(!validPass(newPassword)){
        return res.status(400).json({ err: "Password is not strong" });
    }
    next();
}


