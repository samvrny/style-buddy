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
id: String
color1: String
color2: String
color3: String
}

type Image {
imageId: String
photographer: String
small: String
alt: String
}

type Font {
chosenFont: String

}

type Query {
        me: User
}

type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveImage(imageId: String, photographer: String, small: String, alt: String): User
        removeImage(imageId: String!): User
        saveFont(chosenFont: String): User
        removeFont(chosenFont: String!): User
        savePalette(id: String, color1: String, color2: String, color3: String): User
        removePalette(id: String!): User
}

type Auth {
token: ID!
user: User
}

`;

module.exports = typeDefs;