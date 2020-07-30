import tweetRepository from '../repository/tweet.repository';

const tweetService = {
  create: async function (tweet) {
    try {
      return await tweetRepository.create(tweet);
    } catch (error) {
      throw new Error('Tweet creation failed');
    }
  },

  getAll: async function (params) {
    return await tweetRepository.findAll(params);
  },

  likeOrDislikeTweet: async function (id, userId) {
    return await tweetRepository.likeOrDislikeTweet(id, userId);
  },

  getOne: async function (id) {
    return await tweetRepository.getTweet(id);
  },

  getUserTweets: async function (userId, page) {
    return await tweetRepository.getUserTweets(userId, page);
  },
};

export default tweetService;
