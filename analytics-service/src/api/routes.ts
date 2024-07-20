// src/routes/analytics.ts
import { Router } from 'express';
import { getAnalytics } from './controllers';

const router = Router();

router.get('/analytics', getAnalytics);

export default router;
