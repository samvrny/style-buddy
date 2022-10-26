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
  mutation saveImage() {

  
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