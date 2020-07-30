import { model, Schema, Types } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const TweetSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, default: '' },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    likesCount: Number,
    commentsCount: Number,
  },
  { usePushEach: true, timestamps: true }
);

TweetSchema.pre('save', function (next) {
  if (this.likes) {
    this.likesCount = this.likes.length;
  }

  if (this.comments) {
    this.commentsCount = this.comments.length;
  }
  next();
});

TweetSchema.methods = {
  likeOrDislikeTweet: function (tweet, userId) {
    const likesIndex = this.likes.indexOf(userId);
    if (likesIndex === -1) {
      this.likes.push(userId);
    } else {
      this.likes.splice(likesIndex, 1);
    }
    this.save(tweet);
  },
};

TweetSchema.plugin(mongoosePaginate);

export default model('Tweet', TweetSchema);
