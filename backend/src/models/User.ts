import { Schema, model } from 'mongoose';
import UserInterface from '../interfaces/User'

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    rootDir: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = model<UserInterface>('User', userSchema);

export default User;