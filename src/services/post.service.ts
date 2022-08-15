import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose'
import Post, { PostDocument } from '../schemas/post.schema'
import { checkAuth } from '../utils/checkAuthorization'
import { Request } from 'express'
import { PostInputs } from '../graphql/resolvers/post.resolver'

interface CreatePostInput {
    postInputs: {
        title: string
        content: string
        media: string
    }
}

type Context = {
    context: Request
}

type ID = {
    id: string
}

export const createPost = async ({ postInputs, context }: DocumentDefinition<CreatePostInput & Context>): Promise<PostDocument> => {
    try {
        const decoded = checkAuth(context)
        //@ts-ignore
        const user = decoded!._doc

        if (!user) throw new Error('User not found')

        const newPost = new Post({
            ...postInputs,
            user: user._id,
            username: user.username
        })

        const post = await newPost.save()

        return post
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await Post.find({})
        return posts ? posts : 'Posts not found'
    } catch (error: any) {
        throw new Error(error)
    }
}

export const getPost = async ({ query }: FilterQuery<PostDocument>): Promise<PostDocument | string | null> => {
    try {
        const post = Post.findOne(query).populate({ path: 'comments' })
        const selectedPost = !post ? 'Post not found' : post
        return selectedPost
    } catch (error: any) {
        throw new Error(error)
    }
}

export const updatePost = async ({ id, post, context }: ID & PostInputs & Context): Promise<PostDocument | null> => {
    try {
        const decoded = checkAuth(context)
        //@ts-ignore
        const user = decoded!._doc

        if (!user) throw new Error('User not found')

        const updatedPost = await Post.findByIdAndUpdate(
            { _id: id },
            {
                ...post,
                user: user._id,
                username: user.username
            },
            { new: true }
        )

        if (!updatedPost) throw new Error('Post not found')

        return updatedPost
    } catch (error: any) {
        throw new Error(error)
    }
}

export const deletePost = async ({ id }: ID) => {
    try {
        await Post.findByIdAndDelete(id)
    } catch (error: any) {
        throw new Error(error)
    }
}

