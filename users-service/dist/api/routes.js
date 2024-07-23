"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("./controllers");
const local_strategy_1 = __importDefault(require("./middleware/passport/strategy/local-strategy"));
const router = (0, express_1.Router)();
router.post('/register', controllers_1.register);
router.post('/login', local_strategy_1.default.authenticate("local", { failureMessage: true }), controllers_1.login);
exports.default = router;
