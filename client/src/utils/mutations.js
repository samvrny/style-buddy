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
  mutation saveImage($id: String!, $width: [String!], $height: [String!], $photographer: String, $src: String, $alt: String) {
  saveImage(id: $id, width: $width, height: $height, photographer: $photographer, src: $src, alt: $alt) {
        savedImages {
            id
            width
            height
            photographer
            src
            alt
        }
            _id
            username
            email
            imageCount
      }
    }
`;
export const REMOVE_IMAGE = gql`
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
                alt
        }
      }
    }
`;
export const SAVE_FONT = gql`
  mutation saveFont() {

  
    }
`;
export const REMOVE_FONT = gql`
  mutation removeFont() {

  
    }
`;
export const SAVE_PALETTE = gql`
  mutation savePalette() {

  
    }
`;
export const REMOVE_PALETTE = gql`
  mutation removePalette() {

  
    }
`;
export const REMOVE_IMAGE = gql`
  mutation removeImage() {

  
    }
`;
export const SAVE_FONT = gql`
  mutation saveFont() {

  
    }
`;
export const REMOVE_FONT = gql`
  mutation removeFont() {

  
    }
`;
export const SAVE_PALETTE = gql`
  mutation savePalette() {

  
    }
`;
export const REMOVE_PALETTE = gql`
  mutation removePalette() {

  
    }
`;