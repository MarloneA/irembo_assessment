// src/controllers/AnalyticsController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const getAnalytics = async (req: Request, res: Response) => {
  
};
