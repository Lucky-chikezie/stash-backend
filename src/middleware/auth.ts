import { Request, Response, NextFunction } from 'express';

// This checks if a token was sent and pulls out the userId from it
export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Our token looks like "token_12345", so we split it to get the id
  const token = authHeader.split(' ')[1]; // removes "Bearer "
  
  if (!token || !token.startsWith('token_')) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  const userId = token.replace('token_', '');
  
  // Attach userId to the request so other routes can use it
  (req as any).userId = userId;

  next();
};