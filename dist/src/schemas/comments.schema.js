"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    username: String,
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    content: {
        type: String,
        required: true,
        maxlength: [255, 'Content should not exceed 255 characters']
    },
    image: {
        type: String
    }
}, {
    timestamps: true
});
CommentSchema.methods.toJSON = function () {
    const commentDoc = this;
    const commentObject = commentDoc.toObject();
    delete commentObject.__v;
    return commentObject;
};
const Comment = model('Comment', CommentSchema);
exports.default = Comment;
