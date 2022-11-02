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
  mutation saveImage($imageId: String, $photographer: String, $small: String, $alt: String) {
    saveImage(imageId: $imageId, photographer: $photographer, small: $small, alt: $alt) {
        savedImages {
            imageId
            photographer
            small
            alt
        }
            _id
            username
            email
      }
    }
`;
export const REMOVE_IMAGE = gql`
  mutation removeImage($imageId: String!) {
    removeImage(imageId: $imageId) {
            _id
            username
            email
            savedImages {
                imageId
                photographer
                small
                alt
        }
      }
    }
`;
export const SAVE_FONT = gql`
  mutation saveFont($chosenFont: String) {
    saveFont(chosenFont: $chosenFont) {
      savedFonts{
            chosenFont
          }
            _id
            username
            email
            
      }
    }
`;
export const REMOVE_FONT = gql`
  mutation removeFont($chosenFont: String!) {
    removeFont(chosenFont: $chosenFont) {
            _id
            username
            email
            savedFonts{
                chosenFont
          }
      }
    }
`;
export const SAVE_PALETTE = gql`
  mutation savePalette($id: String, $color1: String, $color2: String, $color3: String) {
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
      }
    }
`;
export const REMOVE_PALETTE = gql`
  mutation removePalette($id: String!) {
    removePalette(id: $id) {
            _id
            username
            email
            savedPalettes {
                id
                color1
                color2
                color3
          }
      }
    }
`;