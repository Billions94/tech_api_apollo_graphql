import mongoose, { Document } from 'mongoose'
import { CommentDocument } from './comments.schema'
import { UserDocument } from "./user.schema"

export interface PostDocument extends Document {
    user: UserDocument['_id']
    username: string
    title: string
    content: string
    media: string
    comments: CommentDocument['_id']
    createdAt: Date
    updatedAt: Date
}

const { Schema, model } = mongoose

const PostSchema = new Schema<PostDocument>(
    {
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
    },
    {
        timestamps: true,
    }
)

PostSchema.methods.toJSON = function () {
    const postDoc = this as PostDocument
    const postObject = postDoc.toObject()

    delete postObject.__v

    return postObject
}


const Post = model<PostDocument>('Post', PostSchema)

export default Post