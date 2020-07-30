import { Router } from 'express';

import followController from '../controllers/follow.controller';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.get('/following', authenticate, followController.getFollowing);
router.get('/followers', authenticate, followController.getFollowers);

router
  .route('/:id')
  .post(authenticate, followController.addFollow)
  .delete(authenticate, followController.removeFollow);

export default router;
