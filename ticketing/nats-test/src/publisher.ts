import nats from 'node-nats-streaming';
import {TicketCreatedPublisher} from './events/ticket-created-publisher'
import { log } from 'console';

console.clear();

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
}); // stan is a community convention (nats in reverse) Client would be a more clear option. 

stan.on('connect', async () => {
  console.log('Pubflisher connected to NATS');

  const publisher = new TicketCreatedPublisher(stan);
  try {
    await publisher.publish({
      id: '123',
      title: 'concert',
      price: 20
    });
     
  } catch (err) {
    console.log(err)
  }
  
  // const data = JSON.stringify ({
  //   id: '123',
  //   title: 'concert',
  //   price: 20
  // });

  // stan.publish('ticket:created', data, () => {
  //   console.log('Event published')
  // });
});