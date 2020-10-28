import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import UserInterface from '../interfaces/User'
import User from '../models/User';
import config from '../config/config';
import { validateEmail, checkFields, verifyPassword } from '../middlewares/ValidateForm';

class Users {

    async logout(req: Request, res: Response) {
        res.removeHeader('x-token')
    }

    async profile(req: Request, res: Response):Promise <Response> {

        const user = await User.findById({ _id: req.user._id })

        return res.json(user);

    }

    async register(req: Request, res: Response): Promise<Response> {
        const { username, fullname, email, password, cpass } = req.body;

        // Verify empty fields
        const checkEmptyFields = checkFields(req.body)

        if (checkEmptyFields) {
            return res.json({
                success: false,
                error: checkEmptyFields
            })
        }

        // Veridy match passwords and validate password
        const validPass = verifyPassword(password, cpass)

        if (validPass) {
            return res.json({
                success: false,
                error: validPass
            })
        }

        // Validate email
        const validEmail = validateEmail(email);
        if (!validEmail) {
            return res.json({
                success: false,
                error: {
                    message: 'El email no es valido',
                    path: "email"
                }
            })
        }

        // Exist email
        const emailExist = await User.findOne({ email: email })
        if (emailExist) {
            return res.json({
                success: false,
                error: {
                    message: 'El email ya existe',
                    path: "email"
                }
            })
        }

        // Exist username
        const usernameExist = await User.findOne({ username: username })
        if (usernameExist) {
            return res.json({
                success: false,
                error: {
                    message: 'El username ya existe',
                    path: "username"
                }
            })
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser: UserInterface = new User({
            username,
            fullname,
            email,
            password: hashPassword
        })

        if (newUser) {
            const pathString: string = <string>config.storage;
            const idString = newUser._id.toString();

            const rootDir = path.join(pathString, idString)

            await fs.promises.mkdir(rootDir);

            newUser.rootDir = rootDir;

            await newUser.save();
            // console.log(pathUser);
            return res.json({
                success: true,
                message: 'Usuario guardado satisfactoriamente',
                newUser,
                errors: []
            })
        } else {
            return res.json({
                success: false,
                errors: {
                    message: 'El usuario no ha sido guardado'
                }
            })
        }
    }

    async login(req: Request, res: Response): Promise<Response> {

        const { email, password } = req.body;

        const validEmail = validateEmail(email);
        if (!validEmail) {
            return res.json({
                success: false,
                error: {
                    message: 'El email no es valido',
                    path: "email"
                }
            })
        }

        // Exists user
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.json({
                success: false,
                error: {
                    message: 'El usuario con este email no existe',
                    path: "email"
                }
            })
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.json({ 
            success: false ,
            error: {
                message: 'La constraseña no es correcta',
                path: "password"
            }
        })

        // Create token 
        const secretString: string = <string> config.sercret
        const token = jwt.sign({ _id: user._id, username: user.username }, secretString, {
            expiresIn: 24 * 60 * 60
        })
        
        return res.set("Access-Control-Expose-Headers", "x-token").set("x-token", token).json({
            success: true,
            token
        })

    }

}

export const user = new Users()