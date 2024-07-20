import { logEvent } from "../api/services";

export const handleEvent = async (message: string) => {
  try {
    const event = JSON.parse(message);
    await logEvent(event.event, event.details);
  } catch (error) {
    console.error('Error handling event', error);
  }
};
