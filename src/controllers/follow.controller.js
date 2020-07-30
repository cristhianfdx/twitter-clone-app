import followService from '../services/follow.service';
import { getUserToken } from '../handlers/user-token.handler';

const followController = {
  addFollow: async function (req, res) {
    const { user } = getUserToken(req);
    const userId = req.params.id;
    try {
      await followService.addFollow(user._id, userId);
      return res.status(200).json();
    } catch (error) {
      return res.status(417).json(error.message);
    }
  },

  removeFollow: async function (req, res) {
    const { user } = getUserToken(req);
    const userId = req.params.id;
    try {
      await followService.removeFollow(user._id, userId);
      return res.status(200).json();
    } catch (error) {
      return res.status(417).json(error);
    }
  },

  getFollowing: async function (req, res) {
    const { user } = getUserToken(req);

    try {
      const following = await followService.getFollowing(user._id, req.query);
      return res.status(200).json(following);
    } catch (error) {
      return res.status(417).json(error);
    }
  },

  getFollowers: async function (req, res) {
    const { user } = getUserToken(req);

    try {
      const following = await followService.getFollowers(user._id, req.query);
      return res.status(200).json(following);
    } catch (error) {
      return res.status(417).json(error);
    }
  },
};

export default followController;
