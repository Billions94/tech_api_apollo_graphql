"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema, model } = mongoose_1.default;
const SessionSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    valid: {
        type: Boolean,
        default: true
    },
    userAgent: {
        type: String
    }
}, {
    timestamps: true,
});
SessionSchema.methods.toJSON = function () {
    const sessionDoc = this;
    const sessionObject = sessionDoc.toObject();
    delete sessionObject.__v;
    return sessionObject;
};
const Session = model('Session', SessionSchema);
exports.default = Session;
