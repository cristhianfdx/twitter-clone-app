import { model, Schema, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const tweetSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    message: { type: String, default: '' },
    comments: [
      {
        message: { type: String, default: '' },
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        commenterName: { type: String, default: '' },
        commenterAvatar: { type: String, default: '' },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likesCount: Number,
    commentsCount: Number,
    createdAt: { type: Date, default: Date.now() },
  },
  { usePushEach: true, timestamps: true }
);

tweetSchema.pre('save', function (next) {
  if (this.likes) {
    this.likesCount = this.likes.length;
  }

  if (this.comments) {
    this.commentsCount = this.comments.length;
  }
  next();
});

tweetSchema.methods = {
  likeOrDislikeTweet: function (tweet, userId) {
    const likesIndex = this.likes.indexOf(userId);
    if (likesIndex === -1) {
      this.likes.push(userId);
    } else {
      this.likes.splice(likesIndex, 1);
    }
    this.save(tweet);
  },

  addComment: function (comment, user, tweet) {
    this.comments.push({
      message: comment.message,
      user: user._id,
      commenterName: user.username,
      commenterAvatar: user.avatar,
    });

    this.save(tweet);
  },

  removeComment: function (commentId, tweet) {
    const index = this.comments.findIndex(
      (c) => c._id.toString() === commentId
    );
    if (index !== -1) {
      this.comments.splice(index, 1);
      this.save(tweet);
    }
  },
};

tweetSchema.plugin(mongoosePaginate);

export default model('Tweet', tweetSchema);
