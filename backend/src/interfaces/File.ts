import { Document } from 'mongoose';

export default interface File extends Document {

    uriFile: string,
    user_id: string,
    date?: Date

}