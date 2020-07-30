import userService from '../services/user.service';

import { validateRequest } from '../handlers/validation-request.handler';
import { getUserToken } from '../handlers/user-token.handler';

export default {
  create: async function (req, res) {
    const userRequest = req.body;
    try {
      validateRequest(req, res);
      await userService.create(userRequest);
      return res.status(201).json();
    } catch (error) {
      return res.status(417).json(error.message);
    }
  },

  getAll: async function (req, res) {
    try {
      const users = await userService.getAll(req.query.page);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(417).json(error.message);
    }
  },

  getByUsername: async function (req, res) {
    const { username } = req.params;
    try {
      const user = await userService.getByUsername(username);
      return res.status(200).json(user);
    } catch (error) {
      return res.status(417).json(error.message);
    }
  },

  update: async function (req, res) {
    const { user } = getUserToken(req);
    try {
      await userService.update(user._id, req.body);
      return res.status(200).json();
    } catch (error) {
      return res.status(417).json(error.message);
    }
  },

  async delete(req, res) {
    const { user } = getUserToken(req);
    try {
      await userService.delete(user._id);
      return res.status(200).json();
    } catch (error) {
      return res.status(417).json(error.message);
    }
  },
};
