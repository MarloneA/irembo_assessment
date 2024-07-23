"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./api/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
// import cors from "cors";
require("./api/middleware/passport/strategy/local-strategy");
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const client_1 = require("@prisma/client");
function createApp() {
    const app = (0, express_1.default)();
    const prisma = new client_1.PrismaClient();
    // app.use(cors());
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, express_session_1.default)({
        cookie: {
            maxAge: 60000 * 60,
            secure: false, //set to true when deploying to prod
            httpOnly: true,
        },
        name: process.env.SESSION_NAME,
        secret: process.env.SESSION_SECRET_KEY || [],
        resave: true,
        saveUninitialized: true,
        store: new prisma_session_store_1.PrismaSessionStore(prisma, {
            checkPeriod: 2 * 60 * 1000, //ms
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }),
    }));
    app.get("/", (request, response) => {
        response.status(200).send({
            msg: "Users service is healthy",
        });
    });
    app.use(passport_1.default.initialize());
    app.use(passport_1.default.session());
    app.use(routes_1.default);
    return app;
}
exports.default = createApp;
