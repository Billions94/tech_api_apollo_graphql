import { postResolver } from './post.resolver'
import { userResolver } from './user.resolver'





const allResolvers = {
    Query: {
        ...postResolver.Query,
        ...userResolver.Query

    },
    Mutation: {
        ...postResolver.Mutation,
        ...userResolver.Mutation,
    },


}

export default allResolvers

export type Resolver = typeof allResolvers;

