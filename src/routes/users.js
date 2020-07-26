import { Router } from 'express';

import { userService } from '../managers/users.manager';
import UserController from '../controllers/users.controller';
import { createUserValidator } from './validators/create-user-validator';
import { authenticate } from '../middlewares/authenticate';

const router = Router();
const controller = new UserController(userService);

router
  .route('/')
  .post(createUserValidator, (req, res) => controller.create(req, res))
  .get(authenticate, (req, res) => controller.getAll(req, res));

router.get('/:username', authenticate, (req, res) =>
  controller.getByUsername(req, res)
);

router
  .route('/:id')
  .patch(authenticate, (req, res) => controller.update(req, res))
  .delete(authenticate, (req, res) => controller.delete(req, res));

export default router;
