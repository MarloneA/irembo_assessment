import amqp from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://localhost';

let channel: amqp.Channel;

export const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    channel = await connection.createChannel();
    console.log('Connected to RabbitMQ');
    await channel.assertQueue('booking_events');
  } catch (error) {
    console.error('Failed to connect to RabbitMQ', error);
  }
};

export const getChannel = () => channel;
