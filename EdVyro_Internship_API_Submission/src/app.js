import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import pinoHttp from 'pino-http';
import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { requestId } from './middleware/requestId.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';
import internshipRoutes from './routes/internshipRoutes.js';
import healthRoutes from './routes/healthRoutes.js';

const app = express();

app.disable('x-powered-by');
app.use(requestId);
app.use(pinoHttp({ logger, customProps: (req) => ({ requestId: req.id }) }));
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN.split(',').map((item) => item.trim()) }));
app.use(compression());
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false, limit: '1mb' }));
app.use(rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  limit: env.RATE_LIMIT_MAX,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { success: false, error: { code: 'RATE_LIMIT_EXCEEDED', message: 'Too many requests. Please try again later.' } },
}));

app.get('/', (_req, res) => res.json({
  success: true,
  name: 'EdVyro Internship API',
  version: '1.0.0',
  documentation: '/docs',
  health: '/api/v1/health',
}));
app.use('/api/v1/health', healthRoutes);
app.use('/api/v1/internships', internshipRoutes);
app.use(notFound);
app.use(errorHandler);

export default app;
