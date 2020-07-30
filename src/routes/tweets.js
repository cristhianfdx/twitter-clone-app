import { Router } from 'express';

import tweetController from '../controllers/tweet.controller';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router
  .route('/')
  .get(authenticate, tweetController.getAll)
  .post(authenticate, tweetController.create);

router
  .route('/:id')
  .get(authenticate, tweetController.getOne)
  .post(authenticate, tweetController.likeOrDislikeTweet);

router.get('/users/:userId', authenticate, tweetController.getUserTweets);

export default router;
