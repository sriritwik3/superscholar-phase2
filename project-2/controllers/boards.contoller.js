import sqlite3 from 'sqlite3';
import Board from '../models/boardSchema.js';
import User from '../models/userSchema.js';



export const getAllBoards = (req, res, next) => {
    Board.find({}).then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        })
};


export const addNewBoard = async(req, res, next) => {
    const reqBody = req.body;
    if (!reqBody.title) {
        res.status(400).json({ error: err.message });
        return;
    }
    const newBoard = await new Board(reqBody);
    newBoard.stage = 1;
    const boards = await Board.find({});
    newBoard.id = boards[boards.length - 1].id + 1;
    const Author = await User.findOne({ email: req.user });
    newBoard.author = Author._id;
    await newBoard.save();
    res.status(201).json({ title: newBoard.title, id: newBoard.id, stage: newBoard.stage });
};


export const updateBoardByID = async(req, res, next) => {
    if (!req.body.stage) {
        res.status(400).json({ error: "stage missing" });
        return;
    }
    const { stage } = req.body;
    const id = +req.params.id;
    if (stage > 3 || stage < 1) {
        res.status(400).json({ error: "stage value must be in the range [1,3]." });
        return;
    }
    const board = await Board.findOneAndUpdate({ id }, { stage }, { new: true });
    res.status(200).json({ title: board.title, id: board.id, stage: board.stage });
};


export const getIndividualID = (req, res, next) => {
    const id = +req.params.id;
    Board.find({ id })
        .then((data) => {
            res.status(200).json(data[0]);
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });

};


export const deleteBoardByID = async(req, res, next) => {
    const id = +req.params.id;
    const board = await Board.findOneAndDelete({ id });
    if (board) {
        res.status(200).json({ msg: "deleted succesfully" });
        return;
    }
    res.status(400).send({ msg: "couldn find a board with that id" });
};