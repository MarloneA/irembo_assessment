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
const client_1 = require("../lib/client");
const utils_1 = require("../lib/utils");
class UserService {
    constructor() { }
    registerUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ email, password, role }) {
            if (!email) {
                throw "invalid user details";
            }
            try {
                const data = yield client_1.prisma.user.create({
                    data: {
                        email,
                        role,
                        password: (0, utils_1.hashPassword)(password),
                    },
                });
                return { data, error: null };
            }
            catch (error) {
                throw error;
            }
        });
    }
    findUserByUniqueEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield client_1.prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
                return user;
            }
            catch (error) {
                throw error;
            }
        });
    }
    findUserByUniqueId(id) {
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
}
exports.default = UserService;
