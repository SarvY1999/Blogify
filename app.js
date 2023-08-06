const express = require("express");
require('dotenv').config();
require('express-async-errors');
const morgan = require("morgan");
const connect = require('./DB/connectDb');
const authRouter = require('./Routes/authRoute');
const errorHandler = require('./Middleware/errorHandler');

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan('tiny'));
app.use(express.json());
app.use('/api/v1/auth', authRouter);


app.use(errorHandler);

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