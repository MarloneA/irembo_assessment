import dotenv from "dotenv";
import createApp from "./app";

dotenv.config();

const PORT = process.env.PORT;
const app = createApp();

app.listen(PORT, () => {
  console.log(`user service is running on port ${PORT}`)
})