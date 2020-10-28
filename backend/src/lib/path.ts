import path from 'path';

import config from '../config/config';


const slash = process.platform === 'win32' ? '\\' : '/';

export const processPath = (pathUrl: string, id: string) => {

    const storage: string = <string>config.storage + id // "/home/santiago/storage/user_id"

    const relativePath = pathUrl ? pathUrl.replace(/-/g, slash) : slash;
    const absoluePath = path.join(storage, relativePath);

    return absoluePath;
}