import express, { Request, Response } from "express";
import router from "./api/routes";

function createApp() {
  const app = express();

  app.get("/", (request: Request, response: Response) => {
    response.status(200).send({
      msg: "Users service is healthy",
    });
  });
  app.use("/api", router);

  return app;
}

export default createApp;