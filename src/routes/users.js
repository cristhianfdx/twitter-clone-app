import { Router } from 'express';

import { userService } from '../managers/users.manager';
import UserController from '../controllers/users.controller';
import { createUserValidator } from './validators/create-user-validator';
import { authenticate } from '../middlewares/authenticate';

const router = Router();
const controller = new UserController(userService);

router
  .route('/')
  .get(authenticate, (req, res) => controller.getByUsername(req, res))
  .post(createUserValidator, (req, res) => controller.create(req, res));

router
  .route('/:id')
  .patch(authenticate, (req, res) => controller.update(req, res));

export default router;
