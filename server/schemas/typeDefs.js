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
<<<<<<< HEAD
id: ID
=======
id: String
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
color1: String
color2: String
color3: String
}

type Image {
<<<<<<< HEAD
id: ID
width: String
height: String
photographer: String
src: String
=======
imageId: String
photographer: String
small: String
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
alt: String
}

type Font {
<<<<<<< HEAD
chosenFont: String!
=======
chosenFont: String
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4

}

type Query {
        me: User
}

type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
<<<<<<< HEAD
        saveImage(id: String!, width: [String!], height: [String!], photographer: String, src: String, alt: String): User
        removeImage(id: String!): User
        saveFont(chosenFont: String!): User
        removeFont(chosenFont: String!): User
        savePalette(id: String!, color1: String, color2: String, color3: String): User
=======
        saveImage(imageId: String, photographer: String, small: String, alt: String): User
        removeImage(imageId: String!): User
        saveFont(chosenFont: String): User
        removeFont(chosenFont: String!): User
        savePalette(id: String, color1: String, color2: String, color3: String): User
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
        removePalette(id: String!): User
}

type Auth {
token: ID!
user: User
}

`;

module.exports = typeDefs;