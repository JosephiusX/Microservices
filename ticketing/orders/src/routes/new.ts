import mongoose from 'mongoose';9
import express, { Request, Response } from 'express';
import {requireAuth, validateRequest } from '@jqgtickets/common';
import {body} from 'express-validator'

const router = express.Router();

router.get('/api/orders/', requireAuth, [
  body('ticketId')
    .not()
    .isEmpty()
    .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
    .withMessage('TicketId must be provided')
],
validateRequest,
 async (req: Request, res: Response) => {
  res.send({});
});

export {router as newOrderRouter};