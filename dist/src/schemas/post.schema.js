"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    username: String,
    title: { type: String, required: true },
    content: {
        type: String,
        required: true,
        maxlength: [500, 'Content length must not be more than 500']
    },
    media: String,
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true,
});
PostSchema.methods.toJSON = function () {
    const postDoc = this;
    const postObject = postDoc.toObject();
    delete postObject.__v;
    return postObject;
};
const Post = model('Post', PostSchema);
exports.default = Post;
