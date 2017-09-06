import { find } from 'lodash';

export const types = `
    type Post {
        id: Int!
        title: String
        author: Author
        votes: Int
    }
`;

export const queries = `
    posts: [Post]
`;

export const mutations = `
    upvotePost (
      postId: Int!
    ): Post
`;



const posts = [
    { id: 1, authorId: 1, title: 'Introduction to GraphQL', votes: 2 },
    { id: 2, authorId: 2, title: 'Welcome to Meteor', votes: 3 },
    { id: 3, authorId: 2, title: 'Advanced GraphQL', votes: 1 },
    { id: 4, authorId: 3, title: 'Launchpad is Cool', votes: 7 },
];


export const resolvers = {
    Query: {
        posts: () => posts,
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