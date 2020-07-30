import { validationResult } from 'express-validator';

export function validateRequest(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((value) => value.msg);
    throw new Error(errorMessages);
  }
}
