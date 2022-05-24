import jwt from "jsonwebtoken";
import '../config/passport.js';
import { hashSync, compareSync } from 'bcrypt';
import UserModel from '../models/userSchema.js';
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async(req, res) => {
    const checkUser = await UserModel.findOne({ email: req.body.email });
    if (checkUser) {
        res.status(400).json({ err: "user with this email already exists" });
        return;
    }
    const user = new UserModel({
        email: req.body.email,
        password: hashSync(req.body.password, 10)
    })

    user.save().then(user => {
        res.status(201).json({
            success: true,
            message: "User created successfully.",
            user: {
                email: user.email,
            }
        })
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: err
        })
    })
};
export const loginUser = (req, res) => {
    UserModel.findOne({ email: req.body.email }).then(user => {
        //No user found
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Could not find the user."
            })
        }

        //Incorrect password
        if (!compareSync(req.body.password, user.password)) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            })
        }

        const payload = {
            email: user.email,
            id: user._id
        }

        const token = jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: "7d" })

        return res.status(200).json({
            success: true,
            message: "Logged in successfully!",
            token: "Bearer " + token
        })
    })
}