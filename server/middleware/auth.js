const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "My-secretttt-9403lkp";

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; 

  if (!token) 
    return res.status(401).json({ err: "Access denied. Token missing." });
  

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; 
    next();
  } 
  catch (err) {
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};

exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({error: "Unauthorized action!!"});
    }
    next();
  };
};

