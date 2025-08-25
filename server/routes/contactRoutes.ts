import type { Express } from 'express';
import { Router } from 'express';
import { createServer, type Server } from 'http';
import asyncHandler from 'express-async-handler';
import { createContact, getAllContacts } from '../controllers/contactController';

import { requireApiKey } from '../security/middleware';
import { contactLimiter } from '../security/rateLimit';
import { verifyHoneypot } from '../security/honeypot';
import { verifyRecaptcha } from '../security/verifyCaptcha';

const router = Router();

// Order matters: rate limit -> honeypot -> captcha -> controller
router.post('/contacts',
  contactLimiter,
  verifyHoneypot,
  verifyRecaptcha,
  asyncHandler(createContact)
);

router.get('/contacts', requireApiKey, asyncHandler(getAllContacts));

export function registerRoutes(app: Express): Server {
  app.use('/api', router);
  return createServer(app);
}