import { model, Schema } from 'mongoose';
import Tweet from './Tweet';

const CommentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    message: { type: String, default: '' },
    commenterName: { type: String, default: '' },
    commenterAvatar: { type: String, default: '' },
  },
  { timestamps: true }
);

CommentSchema.pre('deleteOne', async function (next) {
  const id = this._conditions._id;
  if (!id) return next();
  const tweet = await Tweet.findOne({ comments: id });
  const index = tweet.comments.indexOf(id);
  tweet.comments.splice(index, 1);
  tweet.save();
  next();
});

CommentSchema.statics = {
  removeComment: function (id, user) {
    const index = this.comments.findIndex((c) => c._id.toString() === id);
    if (index !== -1) {
      this.comments.splice(index, 1);
      this.save(tweet);
    }
  },
};

export default model('Comment', CommentSchema);
