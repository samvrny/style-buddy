import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { removeImageId } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_IMAGE, REMOVE_FONT, REMOVE_PALETTE } from '../utils/mutations';

const Favorites = () => {

    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || [];

    if (loading) {
        return <h2>LOADING...</h2>
    }

    const handleRemovePalette = async (id) => {
        console.log(id)
        console.log('Click')
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
    }

    return (
        <main>
            <h1>Favorites Page!</h1>
            <div>
                <h2>My Color Palettes</h2>
                {userData.savedPalettes.map((palette) => {
                    return (
                        <section key={palette.id}>
                            <div style={{ backgroundColor: palette.color1 }}>{palette.color1}</div>
                            <div style={{ backgroundColor: palette.color2 }}>{palette.color2}</div>
                            <div style={{ backgroundColor: palette.color3 }}>{palette.color3}</div>
                            <button onClick={() => handleRemovePalette(palette.id)}>Remove Palette</button>
                        </section>
                    )
                })}
            </div>
            <div>
                <h2>My Fonts</h2>
            </div>
            <div>
                <h2>My Images</h2>
            </div>
        </main>
    );
};

export default Favorites;