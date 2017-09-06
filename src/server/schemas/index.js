import { makeExecutableSchema } from 'graphql-tools';
import * as Post from './post';
import * as Author from './author';
import * as User from './user';

const types = [];
const mutations = [];
const queries = [];

const resolvers = {
    Query: {},
    Mutation: {},
};

const schemas = [Post, Author, User];

schemas.forEach(s => {
    types.push(s.types);
    queries.push(s.queries);
    mutations.push(s.mutations);

    if (s.resolvers) {
        if(s.resolvers.Query)
            resolvers.Query = Object.assign({}, resolvers.Query, s.resolvers.Query);

        if (s.resolvers.Mutation)
            resolvers.Mutation = Object.assign({}, resolvers.Mutation, s.resolvers.Mutation);
    }

});

const typeDefs = `
  ${types.join('\n')}
  
  type Query {
    ${queries.join('\n')}
  }
 
  type Mutation {
    ${mutations.join('\n')}
  }
`;


export default makeExecutableSchema({
    typeDefs,
    resolvers,
});