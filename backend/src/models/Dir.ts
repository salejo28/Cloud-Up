import { Schema, model } from 'mongoose';

import DirInterface from '../interfaces/Dir';

const dirSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
    },
    uriDir: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Dir = model<DirInterface>('Dir', dirSchema)

export default Dir;