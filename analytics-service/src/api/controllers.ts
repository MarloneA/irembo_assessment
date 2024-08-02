// src/controllers/AnalyticsController.ts
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export const getAnalytics = async (req: Request, res: Response) => {
  try {
    const { event, startDate, endDate } = req.query;
    const filters: any = {};

    if (event) {
      filters.event = event as string;
    }

    if (startDate || endDate) {
      filters.timestamp = {};
      if (startDate) {
        filters.timestamp.gte = new Date(startDate as string);
      }
      if (endDate) {
        filters.timestamp.lte = new Date(endDate as string);
      }
    }

    const analytics = await prisma.analytics.findMany({
      where: filters,
      orderBy: {
        timestamp: 'desc',
      },
    });

    res.status(200).json(analytics);
  } catch (error) {
    res.status(400).send('Error fetching analytics');
  }
};
