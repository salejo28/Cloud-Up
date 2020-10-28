import { Response } from 'express'
import path from 'path';
import fs from 'fs';

export const moveFile = (file: any, storagePath: string, res: Response) => {
    const filePath = path.join(storagePath, file.name);

    return new Promise((resolve, reject) => {
        fs.promises.access(filePath)
            .then(() => res.json({
                success: false,
                error: `El archivo ${file.name} ya existe`
            }))
            .catch(() =>
                file.mv(filePath, (err: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                })
            );
    });

}