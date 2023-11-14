import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {requireAuth, validateRequest, NotFoundError } from '@jqgtickets/common';
import {body} from 'express-validator'
import {Ticket} from '../models/ticket';
import {Order} from '../modules/order';

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
  const {ticketId} = req.body;

  const ticket = await Ticket.findById(ticketId); // Find ticket in database
  if(!ticket) { // if not found
    throw new NotFoundError();
  }

  // Make sure ticket is not reserved

  // Calculate expiraton date for order

  // Build order , save to the database

  //Publish an event saying that an order was created

  res.send({});
});

export {router as newOrderRouter};