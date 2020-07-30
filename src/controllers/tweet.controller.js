import tweetService from '../services/tweet.service';
import { getUserToken } from '../handlers/user-token.handler';

const tweetController = {
  create: async function (req, res) {
    const { user } = getUserToken(req);
    const tweet = {
      message: req.body.message,
      user: user._id,
    };
    try {
      await tweetService.create(tweet);
      res.status(201).json();
    } catch (error) {
      res.status(417).json();
    }
  },

  getAll: async function (req, res) {
    const { user } = getUserToken(req);
    const { page } = req.query.page;
    try {
      const tweets = await tweetService.getAll({ page, user });
      return res.status(200).json(tweets);
    } catch (error) {
      return res.status(417).json(error.message);
    }
  },

  likeOrDislikeTweet: async function (req, res) {
    const { id } = req.params;
    const { user } = getUserToken(req);
    try {
      await tweetService.likeOrDislikeTweet(id, user._id);
      return res.status(200).json();
    } catch (error) {
      res.status(417).json(error.message);
    }
  },

  getOne: async function (req, res) {
    const { id } = req.params;
    try {
      const tweet = await tweetService.getOne(id);
      return res.status(200).json(tweet);
    } catch (error) {
      return res.status(417).json(error.message);
    }
  },

  getUserTweets: async function (req, res) {
    const { userId } = req.params;
    const { page } = req.query;
    try {
      const tweets = await tweetService.getUserTweets(userId, page);
      return res.status(200).json(tweets);
    } catch (error) {
      return res.status(417).json(error.message);
    }
  },
};

export default tweetController;
