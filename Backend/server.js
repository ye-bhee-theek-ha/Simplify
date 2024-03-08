
const dotenv = require("dotenv");
const express = require("express");

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.send("API is running...")
})


app.get("/:page_num", (req, res) => {
    page_num = req.params.page_num;
    res.send(`page ${page_num} ...`);
});

const PORT = process.env.PORT || 4000;

app.listen(5000, console.log(`server started on port ${PORT}`))