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
exports.login = exports.register = void 0;
const services_1 = __importDefault(require("./services"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const service = new services_1.default();
    try {
        const { email, password, role } = req.body;
        const { data } = yield service.registerUser({ email, password, role });
        res.status(201).send({
            message: "registration successful proceed to login"
        });
    }
    catch (error) {
        res.status(400).send({
            message: "Error registering user'",
            error
        });
    }
});
exports.register = register;
const login = (req, res) => {
    res.status(200).send({
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
    });
};
exports.login = login;
