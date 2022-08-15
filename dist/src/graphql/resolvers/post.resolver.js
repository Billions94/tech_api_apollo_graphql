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
exports.postResolver = void 0;
const post_service_1 = require("../../services/post.service");
exports.postResolver = {
    Query: {
        getAllPosts: () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, post_service_1.getAllPosts)(); }),
        getPost: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () { return yield (0, post_service_1.getPost)({ id }); })
    },
    Mutation: {
        createPost: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            const postInputs = args.post;
            return yield (0, post_service_1.createPost)({ postInputs, context });
        }),
        updatePost: (_, { id, post }, context) => __awaiter(void 0, void 0, void 0, function* () {
            return yield (0, post_service_1.updatePost)({ id, post, context });
        }),
        deletePost: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            yield (0, post_service_1.deletePost)({ id });
            return 'Post successfully deleted';
        })
    }
};
