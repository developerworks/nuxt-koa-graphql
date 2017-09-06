export const types = `
    type User {
        id: Int!
        username: String!
        email: String!
        password: String!
    }
`;

export const queries = `
  login(
        usernameOrEmail: String!
        password: String!
  ) : User
`;

export const mutations = `  
  register (
    username: String!
    email: String!
    password: String! 
  ): User
`;

export const resolvers = {
    Query: {
        async login(root, args, context) {
            console.log(args);
            return args;
        },
    },
    Mutation: {
        register(root, args, context) {
            console.log(args);
            return args;
        }
    }
};