import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      savedImages {
            imageId
            photographer
            small
            alt
    } savedFonts {
      chosenFont
    } savedPalettes {
      id
      color1
      color2
      color3
    }
  }
}
`;