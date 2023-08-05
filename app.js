const express = require("express");
require('dotenv').config();
require('express-async-errors');
const connect = require('./DB/connectDb');
const authRouter = require('./Routes/authRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/auth', authRouter);

const start = async () => {
    try {
        await connect(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening at ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
};
start();