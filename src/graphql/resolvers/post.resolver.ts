import { Request } from 'express';
import Post from '../../schemas/post.schema'
import { getPost, createPost, updatePost, getAllPosts, deletePost } from '../../services/post.service';
import { checkAuth } from '../../utils/checkAuthorization';

export type PostInputs = {
    post: {
        title: string
        content: string
        media: string
    }
};

type ID = {
    id: string;
}



export const postResolver = {
    Query: {
        getAllPosts: async () => await getAllPosts(),
        getPost: async (_: undefined, { id }: ID) => await getPost({ id })
    },

    Mutation: {
        createPost: async (_: undefined, args: PostInputs, context: Request) => {
            const postInputs = args.post
            return await createPost({ postInputs, context })
        },
        updatePost: async (_: undefined, { id, post }: ID & PostInputs, context: Request) => {
            return await updatePost({ id, post, context })
        },
        deletePost: async (_: undefined, { id }: ID) => {
            await deletePost({ id })
            return 'Post successfully deleted'
        }
    }
}



