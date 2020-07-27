import * as jwt from 'jsonwebtoken';
import config from '../config/config';

export function getUserToken(req) {
  const bearerHeader = req.headers['authorization'];
  const bearer = bearerHeader.split(' ');
  const tkt = bearer[1];
  let user;
  jwt.verify(tkt, config.JWT_SECRET, (err, data) => {
    if (!err) {
      user = data;
    }
  });

  return user;
}
