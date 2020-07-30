import { validateRequest } from '../handlers/validation-request.handler';
import authService from '../services/auth.service';

const authController = {
  login: async function (req, res) {
    const { email, password } = req.body;

    try {
      validateRequest(req, res);
      const token = await authService.createToken(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json(error.message);
    }
  },
};

export default authController;
