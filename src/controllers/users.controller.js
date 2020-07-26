import { validateRequest } from '../handlers/validation-request.handler';

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async create(req, res) {
    const userRequest = req.body;
    validateRequest(req, res);

    try {
      await this.userService.create(userRequest);
      return res.status(201).json();
    } catch (error) {
      return res.status(417).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const users = await this.userService.getAll(req.query.page);
      return res.status(200).json(users);
    } catch (error) {
      return res.status(417).json(error.message);
    }
  }

  async getByUsername(req, res) {
    const { username } = req.params;
    const user = await this.userService.getByUsername(username);
    if (user) {
      user.password = undefined;
      return res.status(200).json(user);
    }
    return res.status(417).json("User doesn't exists");
  }

  async update(req, res) {
    const { id } = req.params;
    try {
      await this.userService.update(id, req.body);
      return res.status(200).json();
    } catch (error) {
      return res.status(417).json(error.message);
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await this.userService.delete(id);
      return res.status(200).json();
    } catch (error) {
      return res.status(417).json(error.message);
    }
  }
}

export default UserController;
