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
exports.getAnalytics = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event, startDate, endDate } = req.query;
        const filters = {};
        if (event) {
            filters.event = event;
        }
        if (startDate || endDate) {
            filters.timestamp = {};
            if (startDate) {
                filters.timestamp.gte = new Date(startDate);
            }
            if (endDate) {
                filters.timestamp.lte = new Date(endDate);
            }
        }
        const analytics = yield prisma.analytics.findMany({
            where: filters,
            orderBy: {
                timestamp: 'desc',
            },
        });
        res.status(200).json(analytics);
    }
    catch (error) {
        res.status(400).send('Error fetching analytics');
    }
});
exports.getAnalytics = getAnalytics;
