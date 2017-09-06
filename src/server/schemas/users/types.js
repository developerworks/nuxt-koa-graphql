export const types = `
    type User {
        id: Int!
        username: String!
        email: String!
        password: String!
    }
`;

export const queries = `
 
`;

export const mutations = `  
   login (
        usernameOrEmail: String!
        password: String!
   ) : User
  
  register (
    username: String!
    email: String!
    password: String! 
  ): User
`;