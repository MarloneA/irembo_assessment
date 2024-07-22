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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const passport_1 = __importDefault(require("passport"));
const client_1 = require("../../../../lib/client");
function findUserByUniqueId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield client_1.prisma.user.findUnique({
                where: {
                    id,
                },
            });
            return user;
        }
        catch (error) {
            throw error;
        }
    });
}
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield findUserByUniqueId(id);
        if (!user) {
            return done(null, false, { message: "user not found" });
        }
        done(null, { id: user === null || user === void 0 ? void 0 : user.id, role: user === null || user === void 0 ? void 0 : user.role });
    }
    catch (error) {
        done(error, null);
    }
}));
exports.default = passport_1.default;
