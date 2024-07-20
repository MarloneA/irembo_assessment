"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./api/routes"));
function createApp() {
    const app = (0, express_1.default)();
    app.get("/", (request, response) => {
        response.status(200).send({
            msg: "Users service is healthy",
        });
    });
    app.use("/api", routes_1.default);
    return app;
}
exports.default = createApp;
