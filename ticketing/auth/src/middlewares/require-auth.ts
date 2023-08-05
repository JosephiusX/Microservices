import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireAuth = (
  req: Request,
 rest: Response,
 next: NextFunction
 ) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }

  next();
};