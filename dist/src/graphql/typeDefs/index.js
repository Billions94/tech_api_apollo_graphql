"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const apollo_server_core_1 = require("apollo-server-core");
exports.typeDefs = (0, apollo_server_core_1.gql) `

  type Comment {
    id: ID
    user: String!
    username: String!
    content: String!
    createdAt: String!
  }

  type Post {
    id: ID
    user: String!
    username: String!
    title: String!
    content: String!
    media: String
    createdAt: String!
    comments: [Comment]
  }

  type User {
    id: ID!
    username: String!
    email: String!
    firstName: String!
    lastName: String!
    image: String!
    token: String!
    refreshToken: String!
    createdAt: String!
  }

    input PostInput {
    title: String!
    content: String!
    media: String
  }

  input CommentInput {
    content: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input UserUpdateInput {
    username: String
    firstName: String
    lastName: String
    email: String
    image: String
  }

  type Query {
    getAllPosts: [Post]
    getPost(id: ID!): Post
    getAllUsers: [User]
    getUser(id: ID!): User
    getAllComments: [Comment]
    getComment(id: ID!): Comment
  }

  type Mutation {
    createPost(post: PostInput): Post
    updatePost(id: ID!, post: PostInput): Post
    deletePost(id: ID!): String
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    updateUser(id: ID!, userInput: UserUpdateInput): User!
    deleteUser(id: ID!): String!
    createComment(commentInput: CommentInput): Comment!
  }
`;
