import { Document } from 'mongoose'

export default interface Dir extends Document {

    name: string,
    user_id: string,
    uriDir: string,
    date?: Date

}