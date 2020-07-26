import { validateRequest } from '../handlers/validation-request.handler';

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  async create(req, res) {
    const userRequest = req.body;
    validateRequest(req, res);
    const user = await this.userService.getByUsernameOrEmail(
      userRequest.username,
      userRequest.email
    );

    if (user) {
      return res.status(417).json('Username or email already exists!');
    }

    try {
      await this.userService.create(userRequest);
      return res.status(201).json();
    } catch (error) {
      console.error(error);
      return res.status(500).json();
    }
  }
}

export default UserController;
