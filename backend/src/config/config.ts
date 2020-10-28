import dotenv from 'dotenv';
dotenv.config();

export default {
    storage: process.env.STORAGE,
    mongoURI: process.env.MONGOURI,
    sercret: process.env.SECRET
}