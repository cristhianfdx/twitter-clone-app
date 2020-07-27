import { Router } from 'express';

import { followService } from '../managers/follow.manager';
import FollowController from '../controllers/follow.controller';
import { authenticate } from '../middlewares/authenticate';

const router = Router();
const controller = new FollowController(followService);

router
  .route('/:userId')
  .post(authenticate, (req, res) => controller.addFollow(req, res));

export default router;
