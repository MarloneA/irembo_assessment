import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const logEvent = async (event: string, details: any) => {
  try {
    await prisma.analytics.create({
      data: {
        event,
        details,
      },
    });
  } catch (error) {
    console.error('Error logging event:', error);
  }
};
