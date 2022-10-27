const { gql } = require('apollo-server-express');

const typeDefs = gql`

type User {

_id: ID
username: String
email: String
savedPalettes: [Palette]
savedImages: [Image]
savedFonts: [Font]

}

type Palette {
id: ID
color1: String
color2: String
color3: String
}

type Image {
id: ID
width: String
height: String
photographer: String
src: String
alt: String
}

type Font {
chosenFont: String!

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