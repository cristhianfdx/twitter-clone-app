class TweetService {
  constructor(tweetRepository, userService) {
    this.tweetRepository = tweetRepository;
    this.userService = userService;
  }

  async create(tweet) {
    try {
      return await this.tweetRepository.create(tweet);
    } catch (error) {
      throw new Error('Tweet creation failed');
    }
  }

  async likeOrDislikeTweet(id, userId) {
    await this.userService.checkUser(userId);
    this.tweetRepository.likeOrDislikeTweet(id, userId);
  }

  async addComment(id, comment, userId) {
    const user = await this.userService.checkUser(userId);
    await this.tweetRepository.addComment(id, comment, user);
  }

  async removeComment(id, commentId) {
    await this.tweetRepository.removeComment(id, commentId);
  }

  async getUserTweets(userId, page) {
    return await this.tweetRepository.userTweets(userId, page);
  }

  async getOne(id) {
    return await this.tweetRepository.checkTweet(id);
  }

  async getAll(page) {
    return await this.tweetRepository.findAll(page);
  }
}

export default TweetService;
