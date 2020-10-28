import express, { Application } from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import dirRoutes from './routes/dirs.routes';
import userRoutes from './routes/user.routes';
import fileRoutes from './routes/file.routes';

export class App {

    app: Application

    constructor (private port?: string | number) {
        this.app = express();

        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        this.app.set('port', process.env.PORT || this.port);
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(fileUpload());
    }

    routes() {
        this.app.use('/dirs', dirRoutes);
        this.app.use('/user', userRoutes);
        this.app.use('/files', fileRoutes);
    }

    async listen(): Promise<void> {
        const port = this.app.get('port');
        await this.app.listen(port)
        console.log('Server on port', port);
    }

}