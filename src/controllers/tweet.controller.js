class TweetController {
  constructor(tweetService) {
    this.tweetService = tweetService;
  }

  async create(req, res) {
    const tweet = {
      message: req.body.message,
      user: req.params.userId,
    };
    try {
      await this.tweetService.create(tweet);
      res.status(201).json();
    } catch (error) {
      res.status(417).json();
    }
  }

  async likeOrDislikeTweet(req, res) {
    const { id, userId } = req.params;
    try {
      await this.tweetService.likeOrDislikeTweet(id, userId);
      return res.status(200).json();
    } catch (error) {
      res.status(417).json(error.message);
    }
  }

  async addComment(req, res) {
    const { id } = req.params;
    const { comment, userId } = req.body;
    try {
      await this.tweetService.addComment(id, comment, userId);
      return res.status(200).json();
    } catch (error) {
      return res.status(417).json(error.message);
    }
  }

  async removeComment(req, res) {
    const { id, commentId } = req.params;
    try {
      await this.tweetService.removeComment(id, commentId);
      return res.status(200).json();
    } catch (error) {
      return res.status(417).json(error.message);
    }
  }

  async getUserTweets(req, res) {
    const { userId } = req.params;
    const { page } = req.query;
    try {
      const tweets = await this.tweetService.getUserTweets(userId, page);
      return res.status(200).json(tweets);
    } catch (error) {
      return res.status(417).json(error.message);
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    try {
      const tweet = await this.tweetService.getOne(id);
      return res.status(200).json(tweet);
    } catch (error) {
      return res.status(417).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const tweets = await this.tweetService.getAll(req.query.page);
      return res.status(200).json(tweets);
    } catch (error) {
      return res.status(417).json(error.message);
    }
  }
}

export default TweetController;
