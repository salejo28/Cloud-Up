import { Router } from 'express';

import { controller } from '../controllers/file.controller';
import verifyToken from '../lib/auth'

const router = Router();

router.get('/:path?', verifyToken, controller.downloadFile);
router.post('/:path?', verifyToken, controller.uploadFile);
router.delete('/:path', verifyToken, controller.deleteFile);


export default router;