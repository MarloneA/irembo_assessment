"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = exports.authoriseUser = void 0;
const authoriseUser = (request, response, next) => {
    if (!request.user) {
        return response.status(401).send({
            message: "unauthorized user",
        });
    }
    next();
};
exports.authoriseUser = authoriseUser;
const checkRole = (role) => (req, res, next) => {
    var _a;
    console.log('req: ', req.user);
    if (((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.role) !== role) {
        return res.status(401).send({ message: "You do not have sufficient permissions to perfom this action" });
    }
    ;
    next();
};
exports.checkRole = checkRole;
