"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideBookingService = exports.cancelBookingService = exports.confirmBookingService = exports.bookSlotService = void 0;
const client_1 = require("../lib/client");
const bookSlotService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ userId, slotId, vehicleId }) {
    try {
        const slot = yield client_1.prisma.slot.findUnique({
            where: { id: slotId },
        });
        if (!slot || slot.isBooked) {
            return { data: null, error: "Slot is unavailable" };
        }
        const booking = yield client_1.prisma.booking.create({
            data: {
                userId,
                slotId,
                vehicleId
            },
        });
        yield client_1.prisma.slot.update({
            where: { id: slotId },
            data: { isBooked: true },
        });
        return { data: { booking }, error: null };
    }
    catch (error) {
        return { data: null, error };
    }
});
exports.bookSlotService = bookSlotService;
const confirmBookingService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ bookingId }) {
    try {
        const booking = yield client_1.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking || booking.confirmed) {
            return { data: null, error: 'Booking unavailable' };
        }
        yield client_1.prisma.booking.update({
            where: { id: bookingId },
            data: { confirmed: true },
        });
        return { data: { booking }, error: null };
    }
    catch (error) {
        return { data: null, error };
    }
});
exports.confirmBookingService = confirmBookingService;
const cancelBookingService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ bookingId }) {
    try {
        const booking = yield client_1.prisma.booking.findUnique({
            where: { id: bookingId },
        });
        if (!booking) {
            return { data: null, error: 'Booking not found' };
        }
        yield client_1.prisma.booking.delete({
            where: { id: bookingId },
        });
        yield client_1.prisma.slot.update({
            where: { id: booking.slotId },
            data: { isBooked: false },
        });
        return { data: { booking }, error: null };
    }
    catch (error) {
        return { data: null, error };
    }
});
exports.cancelBookingService = cancelBookingService;
const overrideBookingService = (_a) => __awaiter(void 0, [_a], void 0, function* ({ bookingId }) {
    try {
        const booking = yield client_1.prisma.booking.findUnique({
            where: { id: bookingId },
            include: { slot: true }
        });
        if (!booking) {
            return { data: null, error: 'Booking not found' };
        }
        if (booking.confirmed) {
            return { data: null, error: "booking has been confirmed, cannot override" };
        }
        yield client_1.prisma.booking.delete({
            where: { id: bookingId },
        });
        yield client_1.prisma.slot.update({
            where: { id: booking.slotId },
            data: { isBooked: false },
        });
        return { data: { booking }, error: null };
    }
    catch (error) {
        return { data: null, error };
    }
});
exports.overrideBookingService = overrideBookingService;
