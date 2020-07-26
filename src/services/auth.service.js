import * as jwt from 'jsonwebtoken';

import config from '../config/config';

class AuthService {
  constructor(userService) {
    this.userService = userService;
  }
  async createToken(username, password) {
    const user = await this.userService.getByUsername(username);
    if (!user) {
      throw new Error('User does not exists.');
    }
    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      return this.getGeneratedToken(user);
    }
    throw new Error('Invalid credentials.');
  }

  getGeneratedToken(user) {
    let basicUser;
    for (const [key, value] of Object.entries(user)) {
      if (key === '_doc') {
        basicUser = value;
        delete basicUser.password;
      }
    }

    return jwt.sign({ user: basicUser }, config.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '24h',
    });
  }
}

export default AuthService;
