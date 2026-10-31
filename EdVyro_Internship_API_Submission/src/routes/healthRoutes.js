import { Router } from 'express';
import { asyncHandler } from '../utils/asyncHandler.js';
import { checkDatabase } from '../config/database.js';

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  await checkDatabase();
  res.json({ success: true, status: 'healthy', services: { api: 'up', database: 'up' }, timestamp: new Date().toISOString() });
}));

export default router;
