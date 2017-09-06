import { find } from 'lodash';

export const types = `
    type Author {
        id: Int!
        firstName: String
        lastName: String
        posts: [Post] # the list of Posts by this author
    }
 `;

export const queries = `
    author(id: Int!): Author
`;


const authors = [
    { id: 1, firstName: 'Tom', lastName: 'Coleman' },
    { id: 2, firstName: 'Sashko', lastName: 'Stubailo' },
    { id: 3, firstName: 'Mikhail', lastName: 'Novikov' },
];

export const resolvers = {
    Query: {
        author: (_, { id }) => find(authors, { id: id }),
    }
};