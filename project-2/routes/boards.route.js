const express = require('express');
const {
    getAllBoards,
    addNewBoard,
    getIndividualID,
    updateBoardByID,
    deleteBoardByID,
} = require('../controllers/boards.contoller.js');
const router = express.Router();

router.route('/')
    .get(getAllBoards)
    .post(addNewBoard);

router.route('/:id')
    .get(getIndividualID)
    .put(updateBoardByID)
    .delete(deleteBoardByID);

module.exports = router;