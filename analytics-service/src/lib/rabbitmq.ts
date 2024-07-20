import amqp from 'amqplib';
import { handleEvent } from './events';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
    
    channel.assertQueue('booking_events');
    channel.consume('booking_events', message => {
      if (message !== null) {
        handleEvent(message.content.toString());
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
  }
};

export const getChannel = () => channel;

