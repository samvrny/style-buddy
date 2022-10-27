const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {

_id: ID
username: String
email: String
palettes: [Palette]
images: [Image]
fonts: [Font]

}

type Palette {

colors: [String]
icons: [String]

}

type Image {

image: [String]

}

type Font {

font: [String]

}

type Query {
        me: User
}

type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        
}

type Auth {
token: ID!
user: User
}

`;

module.exports = typeDefs;