import { model, Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

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
  avatar: { type: String },
  banner: { type: String },
  biography: { type: String },
  location: { type: String },
  website: { type: String },
  tweets: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Tweet',
    },
  ],
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
  const user = this;
  const update = user.getUpdate();
  if (!update.password) return next();
  update.password = await encryptPassword(update.password);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

async function encryptPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

export default model('User', userSchema);
