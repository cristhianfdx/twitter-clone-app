import { Router } from 'express';

import userController from '../controllers/users.controller';
import { createUserValidator } from './validators/create-user-validator';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router
  .route('/')
  .post(createUserValidator, userController.create)
  .get(authenticate, userController.getAll)
  .patch(authenticate, userController.update)
  .delete(authenticate, userController.delete);

router.get('/:username', authenticate, userController.getByUsername);

export default router;
