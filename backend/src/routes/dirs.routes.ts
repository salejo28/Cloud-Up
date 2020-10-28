import { Router } from 'express';

import { controller } from '../controllers/dirs.controller';
import verifyToken from '../lib/auth';

const router = Router();

router.get('/:path?', verifyToken, controller.getDirs);

router.post('/:path?', verifyToken, controller.createDir);

router.put('/:path', verifyToken, controller.editDir);

router.delete('/:path', verifyToken, controller.deleteDir);

export default router;