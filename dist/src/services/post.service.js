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
exports.deletePost = exports.updatePost = exports.getPost = exports.getAllPosts = exports.createPost = void 0;
const post_schema_1 = __importDefault(require("../schemas/post.schema"));
const checkAuthorization_1 = require("../utils/checkAuthorization");
const createPost = ({ postInputs, context }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = (0, checkAuthorization_1.checkAuth)(context);
        //@ts-ignore
        const user = decoded._doc;
        if (!user)
            throw new Error('User not found');
        const newPost = new post_schema_1.default(Object.assign(Object.assign({}, postInputs), { user: user._id, username: user.username }));
        const post = yield newPost.save();
        return post;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.createPost = createPost;
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post_schema_1.default.find({});
        return posts ? posts : 'Posts not found';
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getAllPosts = getAllPosts;
const getPost = ({ query }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = post_schema_1.default.findOne(query).populate({ path: 'comments' });
        const selectedPost = !post ? 'Post not found' : post;
        return selectedPost;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.getPost = getPost;
const updatePost = ({ id, post, context }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = (0, checkAuthorization_1.checkAuth)(context);
        //@ts-ignore
        const user = decoded._doc;
        if (!user)
            throw new Error('User not found');
        const updatedPost = yield post_schema_1.default.findByIdAndUpdate({ _id: id }, Object.assign(Object.assign({}, post), { user: user._id, username: user.username }), { new: true });
        if (!updatedPost)
            throw new Error('Post not found');
        return updatedPost;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.updatePost = updatePost;
const deletePost = ({ id }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield post_schema_1.default.findByIdAndDelete(id);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.deletePost = deletePost;
