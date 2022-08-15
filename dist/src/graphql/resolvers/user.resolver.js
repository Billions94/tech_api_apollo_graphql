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
exports.userResolver = exports.err = void 0;
const user_service_1 = require("../../services/user.service");
const apollo_server_express_1 = require("apollo-server-express");
const user_service_2 = require("../../services/user.service");
exports.err = {
    UserInputError: apollo_server_express_1.UserInputError
};
exports.userResolver = {
    Query: {
        getAllUsers: () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, user_service_2.getUsers)(); }),
        getUser: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, user_service_1.findUser)({ id }); })
    },
    Mutation: {
        register: (_, { registerInput: { username, email, password, confirmPassword } }) => __awaiter(void 0, void 0, void 0, function* () {
            const registeredUser = yield (0, user_service_1.createUser)({ username, email, password, confirmPassword });
            return registeredUser;
        }),
        login: (_, { email, password }) => __awaiter(void 0, void 0, void 0, function* () {
            const loggedInUser = yield (0, user_service_1.login)({ email, password });
            return loggedInUser;
        }),
        updateUser: (_, { id, userInput }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, user_service_1.updateUser)({ id }, Object.assign({}, userInput), { new: true });
        }),
        deleteUser: (_, id) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, user_service_1.deleteUser)({ id });
            return "User sucessfully deleted";
        })
    }
};
