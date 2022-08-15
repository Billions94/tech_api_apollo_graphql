"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const post_resolver_1 = require("./post.resolver");
const user_resolver_1 = require("./user.resolver");
const allResolvers = {
    Query: Object.assign(Object.assign({}, post_resolver_1.postResolver.Query), user_resolver_1.userResolver.Query),
    Mutation: Object.assign(Object.assign({}, post_resolver_1.postResolver.Mutation), user_resolver_1.userResolver.Mutation),
};
exports.default = allResolvers;
