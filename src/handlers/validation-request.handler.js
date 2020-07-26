import { validationResult } from 'express-validator';

export function validateRequest(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((value) => value.msg);
    return res.status(417).json({ errors: errorMessages });
  }
}
