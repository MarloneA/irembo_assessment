import { prisma } from "../lib/client";

export const bookSlotService = async ({ userId, slotId, vehicleId }: { userId: number, slotId: number, vehicleId: number }) => {
  try {
    const slot = await prisma.slot.findUnique({
      where: { id: slotId },
    });

    if (!slot || slot.isBooked) {
      return { data: null, error: "Slot is unavailable" };
    }

    const booking = await prisma.booking.create({
      data: {
        userId,
        slotId,
        vehicleId
      },
    });

    await prisma.slot.update({
      where: { id: slotId },
      data: { isBooked: true },
    });

    return { data: { booking }, error: null }

  } catch (error) {
    return { data: null, error }
  }
}

export const confirmBookingService = async ({ bookingId }: { bookingId: number }) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking || booking.confirmed) {
      return { data: null, error: 'Booking unavailable' }
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: { confirmed: true },
    });

    return { data: { booking }, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const cancelBookingService = async ({ bookingId }: { bookingId: number }) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) {
      return { data: null, error: 'Booking not found' }
    }

    await prisma.booking.delete({
      where: { id: bookingId },
    });

    await prisma.slot.update({
      where: { id: booking.slotId },
      data: { isBooked: false },
    });

    return { data: { booking }, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

export const overrideBookingService = async ({ bookingId }: { bookingId: number }) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { slot: true }
    });

    if (!booking) {
      return { data: null, error: 'Booking not found' }
    }

    if (booking.confirmed) {
      return { data: null, error: "booking has been confirmed, cannot override" }
    }

    await prisma.booking.delete({
      where: { id: bookingId },
    });

    await prisma.slot.update({
      where: { id: booking.slotId },
      data: { isBooked: false },
    });

    return { data: { booking }, error: null }
  } catch (error) {
    return { data: null, error }
  }
}
