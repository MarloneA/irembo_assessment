const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT_PROXY;

app.use(cors());
app.use(express.json());

app.use(
  "/api/dashboard",
  proxy(`${process.env.APP_URL}:${process.env.PORT_ANALYTICS_SERVICE}`)
);
app.use(
  "/api/bookings",
  proxy(`${process.env.APP_URL}:${process.env.PORT_BOOKINGS_SERVICE}`)
);
app.use(
  "/api/auth",
  proxy(`${process.env.APP_URL}:${process.env.PORT_USERS_SERVICE}`)
);

app.listen(PORT, () => {
  console.log(`Gateway is Listening to Port ${PORT}`);
});
