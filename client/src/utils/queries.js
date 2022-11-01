import { gql } from '@apollo/client';

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
<<<<<<< HEAD
      imageCount
      fontCount
      paletteCount
      savedImages {
            id
            width
            height
            photographer
            src
=======
      savedImages {
            imageId
            photographer
            small
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
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