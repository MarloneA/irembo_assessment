import dotenv from "dotenv";
import createApp from "./app";
import { connectRabbitMQ } from "./lib/rabbitmq";

dotenv.config();

const PORT = process.env.PORT;
const app = createApp();

const startServer = async () => {
  await connectRabbitMQ();
  app.listen(PORT, () => {
    console.log(`booking service is running on port ${PORT}`)
  })
};

startServer();