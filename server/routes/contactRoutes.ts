import type { Express } from 'express';
import { Router } from 'express';
import { createServer, type Server } from 'http';
import asyncHandler from 'express-async-handler';
import { createContact, getAllContacts } from '../controllers/contactController';

import { requireApiKey } from '../security/middleware';

const router = Router();

router.post('/contacts', asyncHandler(createContact));
router.get('/contacts', requireApiKey, asyncHandler(getAllContacts));

export function registerRoutes(app: Express): Server {
  app.use('/api', router);
  return createServer(app);
}