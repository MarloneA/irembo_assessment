// @ts-nocheck
import { NextFunction, Request, Response } from "express";

export const authoriseUser = (request: Request, response: Response, next: NextFunction) => {
  if (!request.user) {
    return response.status(401).send({
      message: "unauthorized user",
    });
  }
  next();
};

export const checkRole = (role: string) => (req: Request, res: Response, next: NextFunction) => {
  console.log('req: ', req.user);
  if (req?.user?.role !== role) {
    return res.status(401).send({ message: "You do not have sufficient permissions to perfom this action" })
  };
  next();
}


