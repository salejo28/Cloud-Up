import { Schema, model } from 'mongoose';

import fileInterface from '../interfaces/File';

const fileSchema = new Schema({
    name: String,
    uriFile: {
        type: String,
        required: true,
        unique: true
    },
    user_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const File = model<fileInterface>('File', fileSchema);

export default File;