import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

import { processPath } from '../lib/path';
import Dir from '../models/Dir';
import DirInterface from '../interfaces/Dir';
import File from '../models/File';

class Controller {

    async getDirs(req: Request, res: Response): Promise<Response> {
        const namePath = req.params.path;
        const { _id } = req.user;
        const dirPath = processPath(namePath, _id);
        const content: any = { files: [], dirs: [] }
        try {
            const dir = await fs.promises.opendir(dirPath);

            for await (const dirent of dir) {
                if (dirent.isDirectory()) {
                    content.dirs.push(dirent.name)
                } else {
                    content.files.push(dirent.name)
                }
            }

            content.dirs.sort();
            content.files.sort();

        } catch (err) {
            console.log(err)
        }

        return res.json({
            dirPath,
            content,
            success: true
        })
    }

    async createDir(req: Request, res: Response): Promise<Response> {
        const { _id } = req.user
        const dirPath = processPath(req.params.path, _id);

        const { name } = req.body;
        // Check if name
        if (!name) {
            return res.json({
                success: false,
                error: 'Por Favor especifique el nombre de la carpeta'
            })
        }

        try {
            const dir = path.join(dirPath, name)
            const existDir = await fs.existsSync(dir)
            // Check exists dir
            if (existDir) {
                return res.json({
                    success: false,
                    error: 'Ya hay una carpeta con ese nombre'
                })
            }

            // Save dirPath on database
            const newDir: DirInterface = new Dir({
                name,
                user_id: req.user._id,
                uriDir: dir
            })

            await newDir.save();
            // Create Dir
            await fs.promises.mkdir(dir)
        } catch (error) {
            console.log(error)
        }

        return res.json({
            success: true,
            message: 'Carpeta creada satisfactoriamente'
        })

    }

    async deleteDir(req: Request, res: Response): Promise<Response> {

        const { _id } = req.user;
        const namePath = req.params.path
        const dirPath = processPath(namePath, _id)

        try {
            // check if dir is empty
            const files = await fs.promises.readdir(dirPath)
            if (files.length == 0) {
                // Deleting dir empty
                await fs.promises.rmdir(dirPath)
                await Dir.findOneAndDelete({ uriDir: dirPath });
            } else {
                // Deleting dir with files or dirs
                await files.map(async file => {
                    try {
                        const p = path.join(dirPath, file)
                        console.log(p);
                        const stat = await fs.promises.lstat(p)
                        console.log(stat)
                        if (stat.isDirectory()) {
                            await fs.promises.rmdir(p);
                            await Dir.findOneAndDelete({ uriDir: dirPath });
                        } else {
                            await fs.promises.unlink(p);
                            await File.findOneAndDelete({ uriFile: p });
                        }

                        await fs.promises.rmdir(dirPath);
                    } catch (error) {
                        console.log(error)
                    }
                })
            }

        } catch (error) {
            console.error(error)
            return res.json(error)
        }
        return res.json({
            success: true,
            message: 'Eliminada satisfactoriamente'
        })
    }

    async editDir(req: Request, res: Response): Promise<Response> {

        const { _id } = req.user;
        const { name } = req.body;
        const namePath = req.params.path;
        const dirPath = processPath(namePath, _id)
        // Check if name
        if (!name) {
            return res.json({
                success: false,
                error: "Por Favor especifique el nuevo nombre"
            })
        }

        try {
            // Check if exist dir
            const dir = fs.existsSync(processPath(name, _id))
            if (dir) {
                return res.json({
                    success: false,
                    error: "Ya hay una carpeta con este nombre"
                })
            }
            // Updating of name the dir
            const newDir = processPath(name, _id);
            await fs.promises.rename(dirPath, newDir);
            await Dir.findOneAndUpdate({ uriDir: dirPath }, {
                name,
                uriDir: newDir
            })
        } catch (error) {
            console.log(error)
        }

        return res.json({
            success: true,
            message: 'Carpeta renombrada con exito'
        })
    }

}

export const controller = new Controller()

//export default controller;