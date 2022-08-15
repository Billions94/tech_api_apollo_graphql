"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("config"));
const signJwt = (object, keyName, options) => {
    const signingKey = Buffer.from(config_1.default.get(keyName), 'base64').toString('ascii');
    return jsonwebtoken_1.default.sign(object, signingKey, Object.assign(Object.assign({}, (options && options)), { algorithm: 'RS256' }));
};
exports.signJwt = signJwt;
const verifyJwt = (token, keyName) => {
    const publicKey = Buffer.from(config_1.default.get(keyName), 'base64').toString('ascii');
    try {
        const decoded = jsonwebtoken_1.default.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded,
        };
    }
    catch (e) {
        console.error(e);
        return {
            valid: false,
            expired: e.message === 'jwt expired',
            decoded: null,
        };
    }
};
exports.verifyJwt = verifyJwt;
