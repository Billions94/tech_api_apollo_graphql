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
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const typeDefs_1 = require("./graphql/typeDefs");
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const db_1 = __importDefault(require("./db"));
const log_1 = __importDefault(require("./utils/log"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config_1 = __importDefault(require("config"));
const port = config_1.default.get('port');
function startApolloServer(typeDefs, resolvers) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const httpServer = http_1.default.createServer(app);
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs,
            resolvers,
            context: ({ req }) => ({ req }),
            csrfPrevention: true,
            cache: 'bounded',
            plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })],
        });
        yield server.start();
        server.applyMiddleware({ app });
        app.use((0, cors_1.default)());
        yield (0, db_1.default)();
        yield new Promise(resolve => httpServer.listen({ port }, resolve));
        log_1.default.info(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
}
startApolloServer(typeDefs_1.typeDefs, resolvers_1.default);
