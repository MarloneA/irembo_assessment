import { Request, Response } from 'express';
import UserService from './services';

export const register = async (req: Request, res: Response) => {

  const service = new UserService();

  try {
    const { email, password, role } = req.body;
    const { data } = await service.registerUser({ email, password, role });

    res.status(201).send({
      message: "registration successful proceed to login"
    });
  } catch (error) {
    res.status(400).send({
      message: "Error registering user'",
      error
    });
  }
};

export const login = (req: Request, res: Response) => {
  res.status(200).send({
    isAuthenticated: req.isAuthenticated(),
    user: req.user,
  });
};


