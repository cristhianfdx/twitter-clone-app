import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '../models/User';
import config from '../config/config';

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.JWT_SECRET,
};

export default new Strategy(options, async (payload, done) => {
  try {
    const user = User.findById(payload.id);
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    console.error(error);
  }
});
