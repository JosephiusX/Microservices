// C:\Users\josep\OneDrive\Desktop\Microservices\ticketing\tickets\src\routes\new.ts

import nats, { Stan } from 'node-nats-streaming'; // Importing nats

class NatsWrapper { // Create Class
  private _client?: Stan;

  get client() {
    if (!this._client) {
      throw new Error('Cannot access NATS client before connecting');
    }
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = nats.connect(clusterId, clientId, { url });




    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.client.on('error', (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper(); // Exporting instance of class
