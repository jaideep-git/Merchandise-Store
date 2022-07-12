const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "server/config/config.env" });

const connectDatabase = require('./config/database')
connectDatabase();

app.listen(process.env.PORT, () => {
    console.log(`SERVER RUNNING AT ${process.env.PORT}`)
});

