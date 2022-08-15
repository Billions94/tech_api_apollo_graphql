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
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const { Schema, model } = mongoose_1.default;
const UserSchema = new Schema({
    firstName: { type: String, maxlength: [30, 'Name must be lesst 30 characters'] },
    lastName: { type: String, maxlength: [30, 'Name must be lesst 30 characters'] },
    username: { type: String, unique: true, required: [true, 'Username is required'], maxlength: [30, 'Name must be lesst 30 characters'] },
    email: { unique: true, type: String, required: [true, 'Email is required'] },
    password: { type: String, required: [true, 'Password is required'] },
    image: { type: String, },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    replies: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    refreshToken: { type: String, }
}, {
    timestamps: true,
});
UserSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = this;
        const plainPassword = newUser.password;
        if (newUser.isModified('password')) {
            const hash = yield bcrypt_1.default.hash(plainPassword, 10);
            newUser.password = hash;
        }
        next();
    });
});
UserSchema.methods.toJSON = function () {
    const userDoc = this;
    const userObject = userDoc.toObject();
    delete userObject.password;
    delete userObject.__v;
    delete userObject.refreshToken;
    return userObject;
};
const User = model('User', UserSchema);
exports.default = User;
