import { HttpError } from '../utils/httpError.js';

export function validate(schema) {
  return (req, _res, next) => {
    const result = schema.safeParse({
      body: req.body ?? {},
      params: req.params ?? {},
      query: req.query ?? {},
    });
    if (!result.success) {
      return next(new HttpError(400, 'Request validation failed', 'VALIDATION_ERROR', result.error.flatten()));
    }
    req.validated = result.data;
    next();
  };
}
