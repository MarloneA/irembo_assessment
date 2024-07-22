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
const passport_local_1 = require("passport-local");
const utils_1 = require("../../../../lib/utils");
const services_1 = __importDefault(require("../../../services"));
const service = new services_1.default();
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield service.findUserByUniqueId(id);
        if (!user) {
            return done(null, false, { message: "user not found" });
        }
        done(null, { id: user === null || user === void 0 ? void 0 : user.id, role: user === null || user === void 0 ? void 0 : user.role });
    }
    catch (error) {
        done(err, null);
    }
}));
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "email", passReqToCallback: true }, (request, email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield service.findUserByUniqueEmail(email);
        if (!user) {
            request.res.status(400).send({
                message: "user not found",
            });
            done(null, false);
        }
        if (!(0, utils_1.comparePassword)(password, user.password)) {
            request.res.status(400).send({ message: "invalid credentials" });
            return done(null, false);
        }
        done(null, user);
    }
    catch (error) {
        done(error, null);
    }
})));
exports.default = passport_1.default;
