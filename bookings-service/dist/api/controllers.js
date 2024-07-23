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
exports.overrideBooking = exports.cancelBooking = exports.confirmBooking = exports.bookSlot = void 0;
const services_1 = require("./services");
const constants_1 = require("../lib/constants");
const events_1 = require("../lib/events");
const bookSlot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slotId, vehicleId } = req === null || req === void 0 ? void 0 : req.body;
    const { id } = req === null || req === void 0 ? void 0 : req.user;
    const { data, error } = yield (0, services_1.bookSlotService)({ userId: id, slotId, vehicleId });
    if (error) {
        return res.status(400).send({
            error
        });
    }
    (0, events_1.rabbitMQPublishMessage)(constants_1.BOOKING_ACTION_CREATED, { userId: id, slotId, vehicleId });
    return res.status(201).send({
        data,
        message: 'Slot booked successfully'
    });
});
exports.bookSlot = bookSlot;
const confirmBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.body;
    const { data, error } = yield (0, services_1.confirmBookingService)({ bookingId });
    if (error) {
        return res.status(400).send({ error });
    }
    (0, events_1.rabbitMQPublishMessage)(constants_1.BOOKING_ACTION_CONFIRMED, { bookingId });
    return res.status(200).send({ message: 'Booking confirmed successfully' });
});
exports.confirmBooking = confirmBooking;
const cancelBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.body;
    const { data, error } = yield (0, services_1.cancelBookingService)({ bookingId });
    if (error) {
        return res.status(400).send({ error });
    }
    (0, events_1.rabbitMQPublishMessage)(constants_1.BOOKING_ACTION_CANCELLED, { bookingId });
    res.status(200).send({ message: 'Booking canceled successfully' });
});
exports.cancelBooking = cancelBooking;
const overrideBooking = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookingId } = req.body;
    const { data, error } = yield (0, services_1.overrideBookingService)({ bookingId });
    if (error) {
        return res.status(400).send({ error });
    }
    (0, events_1.rabbitMQPublishMessage)(constants_1.BOOKING_ACTION_OVERRIDE, { bookingId });
    res.status(200).send({ message: 'Booking has been overriden successfully' });
});
exports.overrideBooking = overrideBooking;
