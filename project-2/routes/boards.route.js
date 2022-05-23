import express from 'express';
import {
    getAllBoards,
    addNewBoard,
    getIndividualID,
    updateBoardByID,
    deleteBoardByID,
} from '../controllers/boards.contoller.js';
import passport from "passport";

const router = express.Router();

router
    .route('/')
    .get(passport.authenticate('jwt', { session: false }), getAllBoards)
    .post(addNewBoard);

router.route('/:id')
    .get(getIndividualID)
    .put(updateBoardByID)
    .delete(deleteBoardByID);

export default router;