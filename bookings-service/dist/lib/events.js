"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rabbitMQPublishMessage = void 0;
const rabbitmq_1 = require("./rabbitmq");
const rabbitMQPublishMessage = (event, payload) => {
    const channel = (0, rabbitmq_1.getChannel)();
    const message = JSON.stringify({
        event,
        details: Object.assign({}, payload),
        timestamp: new Date()
    });
    channel.sendToQueue('booking_events', Buffer.from(message));
};
exports.rabbitMQPublishMessage = rabbitMQPublishMessage;
