import { getChannel } from "./rabbitmq";

export const rabbitMQPublishMessage = (event: string, payload: any) => {
  const channel = getChannel();
  const message = JSON.stringify({
    event,
    details: { ...payload },
    timestamp: new Date()
  });
  channel.sendToQueue('booking_events', Buffer.from(message));
}