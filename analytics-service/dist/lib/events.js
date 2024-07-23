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
exports.handleEvent = void 0;
const services_1 = require("../api/services");
const handleEvent = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = JSON.parse(message);
        yield (0, services_1.logEvent)(event.event, event.details);
    }
    catch (error) {
        console.error('Error handling event', error);
    }
});
exports.handleEvent = handleEvent;
