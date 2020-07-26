import { model, Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import * as bcrypt from 'bcrypt';

import Tweet from './Tweet';

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
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
  followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now() },
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    user.password = await encryptPassword(user.password);
    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const user = this.getUpdate();
  if (!user.password) return next();
  user.password = await encryptPassword(user.password);
  next();
});

userSchema.pre('deleteOne', async function (next) {
  const user = this._conditions._id;
  if (!user) return next();
  await Tweet.deleteMany({ user });
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

userSchema.plugin(mongoosePaginate);

export default model('User', userSchema);
