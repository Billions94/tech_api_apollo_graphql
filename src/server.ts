import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'
import cors from 'cors'
import { typeDefs, TypeDefs } from './graphql/typeDefs'
import allResolvers, { Resolver } from './graphql/resolvers'
import connect from './db'
import log from './utils/log'
import dotenv from 'dotenv'
dotenv.config()
import config from 'config'

const port = config.get<number>('port')

async function startApolloServer(typeDefs: TypeDefs, resolvers: Resolver) {

    const app = express();
    const httpServer = http.createServer(app);
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req }) => ({ req }),
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });

    app.use(cors())

    await connect()

    await new Promise<void>(resolve => httpServer.listen({ port }, resolve));
    log.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
}
startApolloServer(typeDefs, allResolvers)