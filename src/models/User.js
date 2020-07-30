import { model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import * as bcrypt from 'bcrypt';

import Follow from './Follow';
import Tweet from './Tweet';

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      enum: ['M', 'F', 'OTHER'],
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    avatar: String,
    banner: String,
    biography: String,
    location: String,
    website: String,
  },
  { timestamps: true }
);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  user.password = await encryptPassword(user.password);
  user.avatar = '/images/no-avatar.png';
  next();
});

UserSchema.pre('findOneAndUpdate', async function (next) {
  const user = this.getUpdate();
  if (!user.password) return next();
  user.password = await encryptPassword(user.password);
  next();
});

UserSchema.pre('deleteOne', async function (next) {
  const user = this._conditions._id;
  if (!user) return next();
  await Tweet.deleteMany({ user });
  next();
});

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

UserSchema.methods = {
  comparePassword: async function (plainText) {
    return await bcrypt.compare(plainText, this.password);
  },
};

UserSchema.plugin(mongoosePaginate);

export default model('User', UserSchema);
