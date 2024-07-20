import dotenv from "dotenv";
import createApp from "./app";

dotenv.config();

const PORT = process.env.PORT;
const app = createApp();

const startServer = async () => {
  app.listen(PORT, () => {
    console.log(`analytics service is running on port ${PORT}`)
  })
};

startServer();