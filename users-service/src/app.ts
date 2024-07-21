import express, { Request, Response } from "express";
import router from "./api/routes";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
// import cors from "cors";
import "./api/middleware/passport/strategy/local-strategy";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import { PrismaClient } from "@prisma/client";

function createApp() {
  const app = express();
  const prisma = new PrismaClient();

  // app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(
    session({
      cookie: {
        maxAge: 60000 * 60,
        secure: false, //set to true when deploying to prod
        httpOnly: true,
      },
      name: process.env.SESSION_NAME,
      secret: process.env.SESSION_SECRET_KEY || [],
      resave: true,
      saveUninitialized: true,
      store: new PrismaSessionStore(prisma, {
        checkPeriod: 2 * 60 * 1000, //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    })
  );

  app.get("/", (request: Request, response: Response) => {
    response.status(200).send({
      msg: "Users service is healthy",
    });
  });
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(router);

  return app;
}

export default createApp;