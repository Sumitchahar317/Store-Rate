const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const prisma = require("./db");

dotenv.config();
const app = express();

const authRoute =  require("./routes/authRoute");
const adminRoute = require("./routes/adminRoute");
const userRoute = require("./routes/userRoute");

app.use(cors());
app.use(express.json());

app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.status(200).json({ status: "OK", message: "Server & Database connected successfully!" });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: error.message });
  }
});

app.get("/" , (req,res)=>{
    res.send("Root page of StoreRating");
})

app.use("/api/auth", authRoute);
app.use("/auth", authRoute);

app.use("/api/admin", adminRoute);
app.use("/admin", adminRoute);

app.use("/api", userRoute);
app.use("/", userRoute);

const PORT = process.env.PORT

app.listen(PORT , ()=>{
    console.log("Server is listening on port ", PORT)
})