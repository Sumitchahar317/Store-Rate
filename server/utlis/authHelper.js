const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.hasedPassword = async(password) =>{
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    return passwordHash;
}

const JWT_SECRET = process.env.JWT_SECRET || "My-secretttt-9403lkp";

exports.jwtToken = (id, name, email, role) =>{
    return jwt.sign( { id, name, email, role}, JWT_SECRET, {expiresIn: "1d" });
}

exports.comparePassword = async (candidatePassword, hashedPassword) => {
  return bcrypt.compare(candidatePassword, hashedPassword);
};

exports.avgRating = (ratingsArray = [])=>{
    if(!ratingsArray || ratingsArray.length === 0)
        return 0;

    const totalScore = ratingsArray.reduce((sum, item) => sum + item.score, 0);
    const average = totalScore / ratingsArray.length;

    return Number(average.toFixed(1));
}

