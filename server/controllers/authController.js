const prisma = require("../db");
const { hasedPassword, jwtToken, comparePassword } = require("../utlis/authHelper");

exports.signUp = async(req, res)=>{
    const {name, email, address, password} = req.body;
    try{
        if (!name || !email || !address || !password) {
            return res.status(400).json({ err: "All fields are required." });
        }
        const Email = email.toLowerCase().trim();

        const existing = await prisma.user.findUnique({where : {email : Email}});
        if(existing)
            return res.status(400).json({err : "Email already registered"});

        const passwordHash = await hasedPassword(password);

        const newUser = await prisma.user.create({
            data :{
                name : name.trim(),
                email : Email,
                passwordHash,
                role : "USER",
                address : address
            },
            select :{
                id: true,
                name: true,
                email: true,
                address: true,
                role: true,
                createdAt: true,
            }
        })
        const token = jwtToken(newUser.id, newUser.name, newUser.email, newUser.role);

        return res.status(201).json({ token : token, user : newUser})
    }
    catch (err){
        return res.status(500).json({err : err.message});
    }
}

exports.login = async(req, res)=>{
    
    try{
        const{email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({err : "Enter both email and password"});
        }
        const Email = email.toLowerCase().trim();

        const existing = await prisma.user.findFirst({where : {email :Email}});

        if(!existing)
            return res.status(400).json({err : "Invalid credentials"});

        const isMatch = await comparePassword(password, existing.passwordHash);

        if(!isMatch)
            return res.status(400).json({err : "Invalid credentials"});

        const token = jwtToken(existing.id, existing.name, existing.email, existing.role);

        return res.status(200).json({ 
            token : token, 
            user : {
                id : existing.id,
                name : existing.name,
                email : existing.email,
                address : existing.address,
                role : existing.role,
            }})
    }
    catch(err){
        return res.status(500).json({err : err.message});
    }
}

exports.changePassword = async(req,res)=>{
    const {oldPassword, newPassword} = req.body;
    const userId = req.user.id;
    try{
        const user = await prisma.user.findUnique({where : {id : userId}});
        if(!user)
            return res.status(404).json({ error: "User not found." });

        const isMatch = await comparePassword(oldPassword, user.passwordHash);
        if(!isMatch)
            return res.status(400).json({ error: "Incorrect old password." });

        const newPasswordHash = await hasedPassword(newPassword);

        await prisma.user.update({
            where: { id: userId },
            data: { passwordHash: newPasswordHash },
        });

        res.status(200).json({ message: "Password updated successfully." });

    }
    catch(err){
        return res.status(500).json({err : err.message});
    }
}
