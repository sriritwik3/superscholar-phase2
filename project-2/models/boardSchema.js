import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import User from './userSchema.js';

const boardSchema = new Schema({
    id: {
        type: Number,
    },

    stage: {
        type: Number,
    },

    title: {
        type: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

// autoIncrement.initialize(connection);

const board = mongoose.model('board', boardSchema);

// boardSchema.plugin(autoIncrement.plugin, {
//     model: 'board',
//     field: 'id',
//     startAt: 1,
//     incrementBy: 1,
// });


export default board;