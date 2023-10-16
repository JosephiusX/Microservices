import nats from 'node-nats-streaming';

const stan = nats.connect('ticketing', 'abc', {
  url: 'http://localhost:4222'
}); // stan is a community convention (nats in reverse) Client would be a more clear option. 

stan.on('connect', () => {
  console.log('Pubflisher connected to NATS');
});