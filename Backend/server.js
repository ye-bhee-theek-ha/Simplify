
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

dotenv.config();
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...")
})

app.use("/api/users", userRoutes)

const PORT = process.env.PORT || 4000;

app.listen(5000, console.log(`server started on port ${PORT}`))