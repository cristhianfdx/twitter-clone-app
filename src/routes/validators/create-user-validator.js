import { body, checkSchema } from 'express-validator';

export const createUserValidator = [
  body('firstName')
    .isString()
    .notEmpty()
    .withMessage('First name is required.'),

  body('lastName').isString().notEmpty().withMessage('Last name is required.'),

  body('birthdate').isString().notEmpty().withMessage('Birthdate is required.'),

  body('genre').notEmpty().withMessage('Genre is required.'),

  body('username')
    .notEmpty()
    .isString()
    .withMessage('Username is required.')
    .isLength({ min: 4, max: 20 })
    .withMessage('Username must be between 4 and 20 characters.'),

  body('password')
    .notEmpty()
    .isString()
    .withMessage('Password is required.')
    .isLength({ min: 6, max: 14 })
    .withMessage('Password must be between 6 and 14 characters.'),

  body('email')
    .notEmpty()
    .isString()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Email must have a valid format'),
];
