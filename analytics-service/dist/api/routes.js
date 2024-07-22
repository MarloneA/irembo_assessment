"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/analytics.ts
const express_1 = require("express");
const controllers_1 = require("./controllers");
const router = (0, express_1.Router)();
router.get('/analytics', controllers_1.getAnalytics);
exports.default = router;
