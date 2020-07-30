import { Router } from 'express';

import authController from '../controllers/auth.controller';
import { loginValidator } from './validators/login-validator';

const router = Router();

router.route('/login').post(loginValidator, authController.login);

export default router;
