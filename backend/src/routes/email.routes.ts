import { Router } from 'express';
import { authenticate } from '@/middleware/auth.middleware.js';
import { sendResultsEmail } from '@/controllers/email.controller.js';

const router = Router();

// Send results email (requires authentication)
router.post('/send-results', authenticate, sendResultsEmail);

export default router;
