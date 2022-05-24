import express from 'express';
import {
    getAllBoards,
    addNewBoard,
    getIndividualID,
    updateBoardByID,
    deleteBoardByID,
} from '../controllers/boards.contoller.js';
import passport from "passport";
import { isAuthor } from '../middleware.js';
import { isAuthenticated } from '../middleware.js';

const router = express.Router();

router
    .route('/')
    .get(getAllBoards)
    .post(isAuthenticated, addNewBoard);

router
    .route('/:id')
    .get(getIndividualID)
    .put(isAuthenticated, isAuthor, updateBoardByID)
    .delete(isAuthenticated, isAuthor, deleteBoardByID);

export default router;