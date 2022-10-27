import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
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
    } savedFonts {
    
    } savedPalettes {
    
    }
  }
}
`;