import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      imageCount
      fontCount
      paletteCount
      savedImages {
            id
            width
            height
            photographer
            src
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