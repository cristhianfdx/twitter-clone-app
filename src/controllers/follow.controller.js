import { getUserToken } from '../handlers/user-token.handler';

class FollowController {
  constructor(followService) {
    this.followService = followService;
  }

  async addFollow(req, res) {
    const { user } = getUserToken(req);
    const { userId } = req.params;
    try {
      await this.followService.addFollow(user, userId);
      return res.status(200).json();
    } catch (error) {
      return res.status(417).json(error.message);
    }
  }
}

export default FollowController;
