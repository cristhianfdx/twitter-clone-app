import * as jwt from 'jsonwebtoken';

import config from '../config/config';

class AuthService {
  constructor(userService) {
    this.userService = userService;
  }
  async createToken(email, password) {
    const user = await this.userService.getByEmail(email);
    if (!user) {
      throw new Error('User does not exists.');
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      user.password = undefined;
      return this.getGeneratedToken(user);
    }
    throw new Error('Invalid credentials.');
  }

  getGeneratedToken(user) {
    return jwt.sign({ user }, config.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '24h',
    });
  }
}

export default AuthService;
