import { Request, Response } from 'express';
import { bookSlotService, cancelBookingService, confirmBookingService, overrideBookingService } from './services';

interface User {
  id: number,
  role: string
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: User;
  }
}

export const bookSlot = async (req: Request, res: Response) => {
  const { slotId, vehicleId } = req?.body;
  const { id }: User = req?.user as User;
  const { data, error } = await bookSlotService({ userId: id, slotId, vehicleId })

  if (error) {
    return res.status(400).send({
      error
    })
  }

  return res.status(201).send({
    data,
    message: 'Slot booked successfully'
  });
};

export const confirmBooking = async (req: Request, res: Response) => {
  const { bookingId } = req.body;
  const { data, error } = await confirmBookingService({ bookingId });

  if (error) {
    return res.status(400).send({ error });
  }

  return res.status(200).send({ message: 'Booking confirmed successfully' });
};

export const cancelBooking = async (req: Request, res: Response) => {
  const { bookingId } = req.body;
  const { data, error } = await cancelBookingService({ bookingId })

  if (error) {
    return res.status(400).send({ error });
  }

  res.status(200).send({ message: 'Booking canceled successfully' });
};

export const overrideBooking = async (req: Request, res: Response) => {
  const { bookingId } = req.body;
  const { data, error } = await overrideBookingService({ bookingId })

  if (error) {
    return res.status(400).send({ error });
  }

  res.status(200).send({ message: 'Booking has been overriden successfully' });
};
