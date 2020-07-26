import { validateRequest } from '../handlers/validation-request.handler';

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  async login(req, res) {
    const { email, password } = req.body;
    validateRequest(req, res);
    try {
      const token = await this.authService.createToken(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json(error.message);
    }
  }
}

export default AuthController;
