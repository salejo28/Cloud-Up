import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';

import config from '../config/config'

declare module 'express' {
    interface Request {
        user?: any
    }
}

export default (req: Request, res: Response, next: NextFunction) => {

    const token: string =<string> req.headers['x-token']

    if (!token) return res.json({
        message: 'Acceso Denegado, porfavor autentiquese'
    })

    try {

        const secretString: string = <string> config.sercret

        const verify = jwt.verify(token, secretString)

        req.user = verify

        next();

    } catch (error) {
        console.error(error)
    }

}