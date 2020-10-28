import { DocumentDefinition } from "mongoose";

import { Document } from 'mongoose'

export default interface User extends Document{
    username: string,
    fullname: string,
    email: string,
    password: string,
    rootDir?: string,
    date?: Date
}