import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();
const pass = process.env.MONGO_PASS;
const url = `mongodb+srv://root:${pass}@cluster0.2r74n.mongodb.net/project?retryWrites=true&w=majority`;
mongoose
    .connect(
        url
    )
    .then(() => {
        console.log('connected to database succesfully.');
    })
    .catch((err) => {
        console.log(err);
    });