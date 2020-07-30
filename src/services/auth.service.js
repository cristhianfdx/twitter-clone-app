import * as jwt from 'jsonwebtoken';

import userService from './user.service';
import config from '../config/config';

const authService = {
  createToken: async function (email, password) {
    const user = await userService.getByEmail(email);
    if (!user) {
      throw new Error('User does not exists.');
    }

    const isMatch = await user.comparePassword(password);
    if (isMatch) {
      user.password = undefined;
      return this.getGeneratedToken(user);
    }
    throw new Error('Invalid credentials.');
  },

  getGeneratedToken: function (user) {
    return jwt.sign({ user }, config.JWT_SECRET, {
      algorithm: 'HS256',
      expiresIn: '24h',
    });
  },
};

export default authService;
