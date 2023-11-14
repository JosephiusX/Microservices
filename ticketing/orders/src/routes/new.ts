import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import { 
  requireAuth, 
  validateRequest, 
  NotFoundError, 
  OrderStatus, 
  BadRequestError 
} from '@jqgtickets/common';
import {body} from 'express-validator'
import {Ticket} from '../models/ticket';
import {Order} from '../modules/order';

const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

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
  const isReserved = await ticket.isReserved();
  if (isReserved) {
    throw new BadRequestError('Ticket is already reserved');
  }

  // Calculate expiraton date for order
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

  // Build order , save to the database
  const order = Order.build({
    userId: req.currentUser!.id,
    status: OrderStatus.Created,
    expiresAt: expiration,
    ticket
  });
  await order.save();

  //Publish an event saying that an order was created
  res.status(201).send(order);
});

export {router as newOrderRouter};