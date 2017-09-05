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