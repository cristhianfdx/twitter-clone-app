import { Router } from 'express';

import { userService } from '../managers/users.manager';
import UserController from '../controllers/users.controller';
import { createUserValidator } from './validators/create-user-validator';

const router = Router();
const controller = new UserController(userService);

router
  .route('/')
  .post(createUserValidator, (req, res) => controller.create(req, res));

export default router;
