import { prisma } from "../lib/client"
import { hashPassword } from '../lib/utils';

export default class UserService {
  constructor() { }

  async registerUser({ email, password, role }: { email: string, password: string, role: string }) {
    if (!email) {
      throw "invalid user details"
    }

    try {
      const data = await prisma.user.create({
        data: {
          email,
          role,
          password: hashPassword(password),
        },
      });

      return { data, error: null };
    } catch (error) {
      throw error
    }
  }

  async findUserByUniqueEmail(email: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  async findUserByUniqueId(id: number) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}





