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

export const mutations = `

`;