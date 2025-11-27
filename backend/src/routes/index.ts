import { Router } from 'express';
import authRoutes from './auth.routes.js';
import emailRoutes from './email.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/email', emailRoutes);

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default router;
