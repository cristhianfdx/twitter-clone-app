import { Router } from 'express';

import AuthController from '../controllers/auth.controller';
import { loginValidator } from './validators/login-validator';
import { authService } from '../managers/auth.manager';

const router = Router();
const controller = new AuthController(authService);

router
  .route('/login')
  .post(loginValidator, (req, res) => controller.login(req, res));

export default router;
