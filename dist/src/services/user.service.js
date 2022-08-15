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
exports.deleteUser = exports.updateUser = exports.findUser = exports.getUsers = exports.login = exports.createUser = void 0;
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_resolver_1 = require("../graphql/resolvers/user.resolver");
const dotenv_1 = __importDefault(require("dotenv"));
const config_1 = __importDefault(require("config"));
const jwt_utils_1 = require("../utils/jwt.utils");
const validator_1 = require("../utils/validator");
const log_1 = __importDefault(require("../utils/log"));
const session_service_1 = require("./session.service");
dotenv_1.default.config();
const createUser = ({ username, email, password, confirmPassword }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { valid, errors } = (0, validator_1.validateRegisterInput)({ username, email, password, confirmPassword });
        if (!valid) {
            throw new user_resolver_1.err.UserInputError('Errors', { errors });
        }
        const user = yield user_schema_1.default.findOne({ username });
        if (user) {
            throw new user_resolver_1.err.UserInputError('Username is taken', {
                errors: {
                    username: 'This username is taken'
                }
            });
        }
        const newUser = new user_schema_1.default({
            username,
            email,
            password,
            createAt: new Date().toISOString()
        });
        const res = yield newUser.save();
        return Object.assign(Object.assign({ message: 'User created successfully' }, res._doc), { id: res._id });
    }
    catch (error) {
        log_1.default.error(error);
        throw new Error(error);
    }
});
exports.createUser = createUser;
const login = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.default.findOne({ email });
        if (!user) {
            throw new user_resolver_1.err.UserInputError('User not found', {
                error: {
                    message: 'User not found',
                }
            });
        }
        const match = yield bcrypt_1.default.compare(password, user.password);
        if (!match)
            throw new Error('Invalid credentials');
        const session = yield (0, session_service_1.createSession)(user._id);
        const token = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session }), "accessTokenPrivateKey", { expiresIn: config_1.default.get("accessTokenTtl") }); // 15 mins
        const refreshToken = (0, jwt_utils_1.signJwt)(Object.assign(Object.assign({}, user), { session: session }), "refreshTokenPrivateKey", { expiresIn: config_1.default.get("refreshTokenTtl") } // 1 year
        );
        return Object.assign(Object.assign({}, user._doc), { id: user._id, token,
            refreshToken });
    }
    catch (error) {
        log_1.default.error(error);
        throw new Error(error);
    }
});
exports.login = login;
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_schema_1.default.find({});
    }
    catch (error) {
        log_1.default.error(error);
        throw new Error(error);
    }
});
exports.getUsers = getUsers;
const findUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_schema_1.default.findOne(query).lean()
            .populate({ path: 'posts' })
            .populate({ path: 'comments' });
    }
    catch (error) {
        log_1.default.error(error);
        throw new Error(error);
    }
});
exports.findUser = findUser;
const updateUser = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_schema_1.default.findOneAndUpdate(query, update, options);
        return user;
    }
    catch (error) {
        log_1.default.error(error);
        throw new Error(error);
    }
});
exports.updateUser = updateUser;
const deleteUser = (query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield user_schema_1.default.deleteOne(query);
    }
    catch (error) {
        log_1.default.error(error);
        throw new Error(error);
    }
});
exports.deleteUser = deleteUser;
