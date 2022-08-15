"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jwt_utils_1 = require("./jwt.utils");
const apollo_server_core_1 = require("apollo-server-core");
const checkAuth = (context) => {
    // @ts-ignore
    const authorization = context.req.headers.authorization;
    if (!authorization)
        throw new Error(`Authorization header must be provided`);
    const token = authorization.split('Bearer ')[1];
    if (!token)
        throw new Error(`Authentication token must be 'Bearer [token]'`);
    try {
        const { decoded } = (0, jwt_utils_1.verifyJwt)(token, 'accessTokenPublicKey');
        return decoded;
    }
    catch (error) {
        throw new apollo_server_core_1.AuthenticationError('Invalid/Expired token provided');
    }
};
exports.checkAuth = checkAuth;
