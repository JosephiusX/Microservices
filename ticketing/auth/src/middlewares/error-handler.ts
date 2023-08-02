import { Request, Response, NextFunction } from 'express';

// the goal of this error handler is to return a consistant message
export const errorHandler = ( 
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
  ) => {
    console.log('Something went wrong', err);
    
    res.status(400).send({
      message: 'Something went wrong'
    })
  };