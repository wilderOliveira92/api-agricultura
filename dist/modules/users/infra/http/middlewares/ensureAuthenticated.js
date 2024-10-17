"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ensureAuthenticated;
const jsonwebtoken_1 = require("jsonwebtoken");
const appError_1 = __importDefault(require("@shared/errors/appError"));
const auth_1 = __importDefault(require("@config/auth"));
function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new appError_1.default('Token is missing.', 401);
    }
    const [, token] = authHeader.split(' ');
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, auth_1.default.jwt.secret);
        const { sub } = decoded;
        request.user = {
            id: sub,
        };
        return next();
    }
    catch (_a) {
        throw new appError_1.default('Token is invalid.', 401);
    }
}
