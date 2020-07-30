import { Types } from 'mongoose';
import Tweet from '../models/Tweet';
import Follow from '../models/Follow';

const tweetRepository = {
  create: async function (tweet) {
    const newTweet = new Tweet(tweet);
    return await newTweet.save();
  },

  findAll: async function (params) {
    const { page, user } = params;
    const follow = await Follow.findOne({ user });
    const criteria = [{ user }];
    if (follow) {
      follow.followed.forEach((val) => {
        criteria.push({ user: val });
      });
    }
    return await Tweet.paginate(
      { $or: criteria },
      { sort: { createdAt: -1 }, page, populate: { path: 'comments' } }
    );
  },

  likeOrDislikeTweet: async function (id, userId) {
    const tweet = await this.getTweet(id);
    return tweet.likeOrDislikeTweet(tweet, userId);
  },

  getTweet: async function (id) {
    const tweet = await Tweet.findById(id).populate('comments');
    if (!tweet) throw new Error('Tweet does not exists.');
    return tweet;
  },

  getUserTweets: async function (userId, page) {
    return await Tweet.paginate(
      { user: userId },
      { sort: { createdAt: -1 }, page }
    );
  },
};

export default tweetRepository;
