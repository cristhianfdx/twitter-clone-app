import { Router } from 'express';

import commentController from '../controllers/comment.controller';
import { authenticate } from '../middlewares/authenticate';

const router = Router();

router.post('/tweets/:id', authenticate, commentController.addComment);
router.delete('/:id', authenticate, commentController.removeComment);

export default router;
