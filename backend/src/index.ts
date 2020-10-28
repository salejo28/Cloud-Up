import { App } from './app';
import db from './database';

async function main() {
    const app = new App(4000)
    await app.listen()
    await db;
    // console.log(process.env.STORAGE+ 'algo')  
    // const dir = process.env.STORAGE
    // await fs.promises.mkdir(path.join(dir!, 'proof'))
}

main();