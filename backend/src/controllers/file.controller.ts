import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';

import File from '../models/File';
import fileInterface from '../interfaces/File';
import { processPath } from '../lib/path';
import { moveFile } from '../lib/moveFile';

class Files {

    downloadFile(req: Request, res: Response) {

        const filePath = req.params.path;
        const { _id } = req.user;
        const file = processPath(filePath, _id);

        const mimeType: string = <string>mime.lookup(file)
        // console.log(mimeType);

        res.setHeader('Content-Disposition', `attachment; filename=${file}`)
        res.setHeader('Content-Type', mimeType);
        res.download(file)
    }

    async uploadFile(req: Request, res: Response): Promise<Response> {
        if (!req.files) {
            return res.json({
                success: false,
                error: "Archivo no seleccionado"
            })
        }

        const { _id } = req.user;
        const dirPath = processPath(req.params.path, _id)
        let files: any = req.files.file

        if (!Array.isArray(files)) {
            files = [files];
        }

        try {
            for (const file of files) {
                // console.log(path.join(dirPath, file.name))
                const filePath = path.join(dirPath, file.name)

                const newFile: fileInterface = new File({
                    name: file.name,
                    uriFile: filePath,
                    user_id: _id
                })

                await newFile.save();
                await moveFile(file, dirPath, res)
            }
        } catch (error) {
            return res.json(error)
        }

        return res.json({
            success: true,
            message: 'Uploaded'
        })
    }

    async deleteFile(req: Request, res: Response): Promise<Response> {

        const { _id } = req.user;
        const namePath = req.params.path;
        const filePath = processPath(namePath, _id);


        try {
            await fs.promises.unlink(filePath);
            await File.findOneAndDelete({ uriFile: filePath })
        } catch (error) {
            console.log(error)
        }

        return res.json({
            success: true,
            message: "Archivo eliminado"
        })
    }

}

export const controller = new Files();