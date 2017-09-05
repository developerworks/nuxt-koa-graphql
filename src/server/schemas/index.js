import { makeExecutableSchema } from 'graphql-tools';
import { find } from 'lodash';
import * as Post from './post';
import * as Author from './author';

const types = [];
const mutations = [];
const queries = [];

const schemas = [Post, Author];

schemas.forEach(s => {
    types.push(s.types);
    queries.push(s.queries);
    mutations.push(s.mutations);
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

// example data
const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

const posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];

const resolvers = {
    Query: {
        posts: () => posts,
        author: (_, { id }) => find(authors, { id: id }),
    },
    Mutation: {
        upvotePost: (_, { postId }) => {
            const post = find(posts, { id: postId });
            if (!post) {
                throw new Error(`Couldn't find post with id ${postId}`);
            }
            post.votes += 1;
            return post;
        },
    },
};

export default makeExecutableSchema({
    typeDefs,
    resolvers,
});