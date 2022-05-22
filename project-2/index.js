const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
require("dotenv").config();
const boardRoutes = require('./routes/boards.route.js');
const userRoutes = require('./routes/users.route.js');

//const auth = require('./middlewares/middleware');


app.use(
    helmet(),
    morgan('dev'),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    cors({
        origin: 'http://localhost:3000',
    }),
);

app.use('/boards', boardRoutes);
app.use('/users', userRoutes);

module.exports = app;