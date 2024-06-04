const express = require("express");
const cors = require("cors");
const connect = require("./db/database.js")
const user = require("./routes/user.route.js");
const app = express();

connect()
app.use(cors());
app.use(express.json())
app.use("/api/v1", user);

app.listen(4000, () => {
    console.log("Serevre is running on port 4000");
})