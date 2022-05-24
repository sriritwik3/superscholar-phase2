const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { getAllBoards, addNewBoard, getIndividualID, updateBoardByID, deleteBoardByID } = require('./controllers/boards.contoller.js')

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: '*',
    })
);

app.route('/boards')
    .get(getAllBoards)
    .post(addNewBoard)

app.route('/boards/:id')
    .get(getIndividualID)
    .put(updateBoardByID)
    .delete(deleteBoardByID);

module.exports = app;