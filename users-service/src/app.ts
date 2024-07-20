import express, { Request, Response } from "express";
import router from "./api/routes";
import passport from "passport";
import "./api/middleware/passport/strategy/local-strategy";


function createApp() {
  const app = express();

  app.use(express.json());

  app.get("/", (request: Request, response: Response) => {
    response.status(200).send({
      msg: "Users service is healthy",
    });
  });
  app.use(passport.initialize());
  app.use(passport.session());
  app.use("/api", router);

  return app;
}

export default createApp;