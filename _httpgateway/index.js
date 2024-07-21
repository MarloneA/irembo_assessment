const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dashboard", proxy("http://localhost:8083"));
app.use("/api/bookings", proxy("http://localhost:8082"));
app.use("/api/auth", proxy("http://localhost:8081"));

app.listen(8000, () => {
  console.log("Gateway is Listening to Port 8000");
});
