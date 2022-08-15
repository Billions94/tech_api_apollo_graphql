"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = require("cloudinary");
const multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("config"));
const cloudName = config_1.default.get("cloudName");
const apiKey = config_1.default.get("apiKey");
const apiSecret = config_1.default.get("apiSecret");
// CLOUDINARY CONFIG
cloudinary_1.v2.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true
});
// IMAGE CLOUD STORAGE
const cloudinaryStorage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        folder: "BeatStudio",
        resource_type: "auto",
    },
});
const uploader = (0, multer_1.default)({
    storage: cloudinaryStorage,
    limits: {
        fileSize: 100000000 // 10000000 Bytes = 100 MB
    },
    fileFilter(req, file, cb) {
        // upload only mp4 and mkv format
        if (!file.originalname.match(/\.(jpeg|png|gif|heic|jpg|mp4|MPEG-4|mkv)$/)) {
            return cb(new Error('Accepted file types: jpeg, png, gif, heic, jpg, mp4, MPEG-4, mkv'));
        }
        cb(null, true);
    }
});
exports.default = uploader;
