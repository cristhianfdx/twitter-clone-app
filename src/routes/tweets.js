import { Router } from 'express';

import TweetController from '../controllers/tweet.controller';
import { tweetService } from '../managers/tweet.manager';
import { authenticate } from '../middlewares/authenticate';

const router = Router();
const controller = new TweetController(tweetService);

router.route('/').get(authenticate, (req, res) => controller.getAll(req, res));

router.get('/:id', authenticate, (req, res) => controller.getOne(req, res));

router
  .route('/users/:userId')
  .get(authenticate, (req, res) => controller.getUserTweets(req, res))
  .post(authenticate, (req, res) => controller.create(req, res));

router.post('/:id/users/:userId', authenticate, (req, res) =>
  controller.likeOrDislikeTweet(req, res)
);

router.post('/:id/comment', authenticate, (req, res) =>
  controller.addComment(req, res)
);

router.delete('/:id/comment/:commentId', authenticate, (req, res) =>
  controller.removeComment(req, res)
);

export default router;
