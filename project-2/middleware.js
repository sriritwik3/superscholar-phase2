import jwt from 'jsonwebtoken';
const secret = process.env.TOKEN_KEY;
import Board from './models/boardSchema.js';
import User from './models/userSchema.js';

export const authMiddleware = (req, res, next) => {
    // console.log("ok", req.headers);
    //const token = req.header('Access-Tokem');
    // console.log(req.header('Access-Token'));
    let token = req.headers.authorization;
    if (!token) {
        return next();
    }
    // console.log(token.slice(7));
    try {
        if (token.startsWith("Bearer ")) token = token.slice(7);
        else { return next(); }
        const temp = jwt
            .verify(token, 'Pretending to be a secert! Buahh!', {
                ignoreExpiration: true,
            });
        //console.log(temp.username);
        req.user = temp.email;
    } catch (err) {
        console.log(err);
        return next();
    }
    next();
}

export const isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.status(401).json({ err: "User not authenticated" });
}

export const isAuthor = async(req, res, next) => {
    const id = +req.params.id;
    const board = await Board.find({ id });
    const Author = await User.findOne({ email: req.user });
    if (!Author._id.equals(board[0].author)) {
        res.status(403).json({ err: "not authorized" });
        return;
    }
    next();
}