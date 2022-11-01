import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
            }
        }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
  }
`;

export const SAVE_IMAGE = gql`
<<<<<<< HEAD
  mutation saveImage($id: String!, $width: [String!], $height: [String!], $photographer: String, $src: String, $alt: String) {
    saveImage(id: $id, width: $width, height: $height, photographer: $photographer, src: $src, alt: $alt) {
        savedImages {
            id
            width
            height
            photographer
            src
=======
  mutation saveImage($imageId: String, $photographer: String, $small: String, $alt: String) {
    saveImage(imageId: $imageId, photographer: $photographer, small: $small, alt: $alt) {
        savedImages {
            imageId
            photographer
            small
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
            alt
        }
            _id
            username
            email
<<<<<<< HEAD
            imageCount
=======
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
      }
    }
`;
export const REMOVE_IMAGE = gql`
<<<<<<< HEAD
  mutation removeImage($id: String!) {
    removeImage(id: $id) {
            _id
            username
            email
            imageCount
            savedImages {
                id
                width
                height
                photographer
                src
=======
  mutation removeImage($imageId: String!) {
    removeImage(imageId: $imageId) {
            _id
            username
            email
            savedImages {
                imageId
                photographer
                small
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
                alt
        }
      }
    }
`;
export const SAVE_FONT = gql`
<<<<<<< HEAD
  mutation saveFont($chosenFont: String!) {
=======
  mutation saveFont($chosenFont: String) {
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
    saveFont(chosenFont: $chosenFont) {
      savedFonts{
            chosenFont
          }
            _id
            username
            email
<<<<<<< HEAD
            fontCount
=======
            
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
      }
    }
`;
export const REMOVE_FONT = gql`
  mutation removeFont($chosenFont: String!) {
    removeFont(chosenFont: $chosenFont) {
            _id
            username
            email
<<<<<<< HEAD
            fontCount
=======
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
            savedFonts{
                chosenFont
          }
      }
    }
`;
export const SAVE_PALETTE = gql`
<<<<<<< HEAD
  mutation savePalette($id: String!, $color1: String, $color2: String, $color3: String) {
=======
  mutation savePalette($id: String, $color1: String, $color2: String, $color3: String) {
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
    savePalette(id: $id, color1: $color1, color2: $color2, color3: $color3) {
      savedPalettes{
            id
            color1
            color2
            color3
          }
            _id
            username
            email
<<<<<<< HEAD
            paletteCount
=======

>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
      }
    }
`;
export const REMOVE_PALETTE = gql`
  mutation removePalette($id: String!) {
    removePalette(id: $id) {
            _id
            username
            email
<<<<<<< HEAD
            paletteCount
=======
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
            savedPalettes {
                id
                color1
                color2
                color3
          }
      }
    }
`;