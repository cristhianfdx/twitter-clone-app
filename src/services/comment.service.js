import commentRepository from '../repository/comment.repository';
import tweetService from '../services/tweet.service';

const commentService = {
  addComment: async function (tweetId, message, user) {
    const tweet = await tweetService.getOne(tweetId);
    return await commentRepository.addComment(tweet, message, user);
  },

  removeComment: async function (id, user) {
    await commentRepository.removeComment(id, user);
  },
};

export default commentService;
