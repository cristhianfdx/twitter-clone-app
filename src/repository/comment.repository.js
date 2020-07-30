import Comment from '../models/Comment';

const commentRepository = {
  async addComment(tweet, message, user) {
    const comment = new Comment({
      message,
      user: user._id,
      commenterName: user.username,
      commenterAvatar: user.avatar,
    });

    const saved = await comment.save();
    tweet.comments.push(saved._id);
    return await tweet.save();
  },

  async removeComment(id, user) {
    return Comment.deleteOne({ _id: id });
  },
};

export default commentRepository;
