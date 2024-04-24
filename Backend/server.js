
const dotenv = require("dotenv");
const express = require("express");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const flightRoutes = require("./routes/flightRoutes")
const airportRouts = require("./routes/airportRoutes")
const UserReviewsRoutes = require("./routes/UserReviewsRoutes")
const { NotFound, errHandler } = require("./middlewares/errorMiddleware");

//const uploadToMongo = require('./utils/upload_to_mongo');



const app = express();

var cors = require('cors')
app.use(cors())

dotenv.config();
connectDB();
app.use(express.json());



app.get("/", (req, res) => {
    res.send("API is running...")
})

app.use("/api/users", userRoutes)
app.use("/api/flights", flightRoutes)
app.use("/api/airports", airportRouts)
app.use("/api/reviews", UserReviewsRoutes)

app.use(NotFound);
app.use(errHandler);

const PORT = process.env.PORT || 4000;

app.listen(5000, console.log(`server started on port ${PORT}`))