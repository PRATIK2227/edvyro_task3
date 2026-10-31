import { logger } from '../config/logger.js';

export function errorHandler(error, req, res, _next) {
  const status = Number.isInteger(error.statusCode) ? error.statusCode : 500;
  const code = error.code || 'INTERNAL_SERVER_ERROR';
  if (status >= 500) logger.error({ err: error, requestId: req.id }, 'Request failed');
  else logger.warn({ code, requestId: req.id, message: error.message }, 'Request rejected');

  res.status(status).json({
    success: false,
    error: {
      code,
      message: status >= 500 && process.env.NODE_ENV === 'production'
        ? 'An unexpected error occurred'
        : error.message,
      ...(error.details ? { details: error.details } : {}),
    },
    requestId: req.id,
  });
}
