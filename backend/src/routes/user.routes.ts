import { Router } from 'express';

import { user } from '../controllers/user.controller';
import verifyToken from '../lib/auth';

const router = Router();

router.get('/profile', verifyToken, user.profile);

router.get('/logout', verifyToken, user.logout);

router.post('/register', user.register);

router.post('/login', user.login);

export default router;