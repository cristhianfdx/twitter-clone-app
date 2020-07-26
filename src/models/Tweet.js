import { model, Schema } from 'mongoose';

const tweetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  message: { type: String },
  date: { type: Date },
  likes: { type: Number },
});

export default model('Tweet', tweetSchema);
