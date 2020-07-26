import { body } from 'express-validator';

export const loginValidator = [
  body('username').isString().withMessage('Username is required.'),
  body('password').isString().withMessage('Password is required.'),
];
