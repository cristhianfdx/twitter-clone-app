import { model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const FollowSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    followed: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { usePushEach: true, timestamps: true }
);

FollowSchema.plugin(mongoosePaginate);

export default model('Follow', FollowSchema);
