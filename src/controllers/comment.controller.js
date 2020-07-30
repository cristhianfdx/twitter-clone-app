import commentService from '../services/comment.service';
import { getUserToken } from '../handlers/user-token.handler';

const commentController = {
  addComment: async function (req, res) {
    const tweetId = req.params.id;
    const { message } = req.body;
    try {
      const { user } = getUserToken(req);
      await commentService.addComment(tweetId, message, user);
      return res.status(200).json();
    } catch (error) {
      return res.status(417).json(error.message);
    }
  },

  removeComment: async function (req, res) {
    const { id } = req.params;
    try {
      const { user } = getUserToken(req);
      await commentService.removeComment(id, user);
      return res.status(200).json();
    } catch (error) {
      return res.status(417).json(error.message);
    }
  },
};

export default commentController;
