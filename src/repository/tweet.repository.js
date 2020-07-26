import { Types } from 'mongoose';
import Tweet from '../models/Tweet';

class TweetRepository {
  async create(tweet) {
    const newTweet = new Tweet(tweet);
    return await newTweet.save();
  }

  async likeOrDislikeTweet(id, userId) {
    const tweet = await this.checkTweet(id);
    return tweet.likeOrDislikeTweet(tweet, userId);
  }

  async addComment(id, comment, user) {
    const tweet = await this.checkTweet(id);
    return tweet.addComment(comment, user, tweet);
  }

  async removeComment(id, commentId) {
    const tweet = await this.checkTweet(id);
    return tweet.removeComment(commentId, tweet);
  }

  async userTweets(userId, page) {
    return await Tweet.paginate(
      { user: Types.ObjectId(userId) },
      { sort: { createdAt: -1 }, page }
    );
  }

  async checkTweet(id) {
    const isExists = await this.findById(id);
    if (!isExists) throw new Error('Tweet does not exists.');
    return isExists;
  }

  async findAll(page) {
    return await Tweet.paginate({}, { sort: { createdAt: -1 }, page });
  }

  async findById(id) {
    return await Tweet.findById(id);
  }
}

export default TweetRepository;
