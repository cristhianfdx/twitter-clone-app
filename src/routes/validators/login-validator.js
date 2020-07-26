import { body } from 'express-validator';

export const loginValidator = [
  body('email').isString().withMessage('Email is required.'),
  body('password').isString().withMessage('Password is required.'),
];
