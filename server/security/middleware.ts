import type { RequestHandler } from 'express';

export const requireApiKey: RequestHandler = (req, res, next) => {
  const key = req.header('x-api-key');
  if (!key || key !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
};