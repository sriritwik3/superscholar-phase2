import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: 'Your email is required',
        trim: true,
    },

    password: {
        type: String,
        required: 'Your password is required',
        max: 100,
    },
});

const User = mongoose.model('user', userSchema);

export default User;