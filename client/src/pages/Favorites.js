import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { removeImageId } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_IMAGE, REMOVE_FONT, REMOVE_PALETTE } from '../utils/mutations';



const Favorites = () => {

    return (
        <div>
            Favorites Page!
        </div>
    );
};



export default Favorites;