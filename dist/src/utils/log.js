"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-noCheck
const pino_1 = __importDefault(require("pino"));
const pino_pretty_1 = __importDefault(require("pino-pretty"));
const dayjs_1 = __importDefault(require("dayjs"));
const log = (0, pino_1.default)({
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${(0, dayjs_1.default)().format()}"`,
}, (0, pino_pretty_1.default)());
exports.default = log;
