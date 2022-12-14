import React, { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_IMAGE, REMOVE_FONT, REMOVE_PALETTE } from '../utils/mutations';
import WebFont from 'webfontloader';

const Favorites = () => {

    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || [];
    const [removePalette] = useMutation(REMOVE_PALETTE);
    const [removeFont] = useMutation(REMOVE_FONT);
    const [removeImage] = useMutation(REMOVE_IMAGE);

    const loadWebFont = async (font) => {
        WebFont.load({
            google: {
                families: [font.chosenFont]
            }
        });
    }

    if (loading) {
        return <h2>LOADING...</h2>
    }

    const handleRemovePalette = async (id) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try {
            await removePalette({
                variables: { id }
            })
        } catch (err) {
            console.error(err);
        }
    };

    const handleRemoveFont = async (chosenFont) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try {
            await removeFont({
                variables: { chosenFont }
            })
        } catch (err) {
            console.error(err);
        }
    }

    const handleRemoveImage = async (imageId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }

        try {
            await removeImage({
                variables: { imageId }
            })
        } catch (err) {
            console.error(err);
        }
    }

    loadWebFont()

    return (
        <main className='flex2 column'>
            <h1 style={{ fontFamily: 'Nosifer' }} className="favorites-header">My Styles</h1>
            <div className='width'>
                <h5 style={{ fontFamily: 'Bungee Shade' }} className='group-title'>My Color Palettes</h5>
                <div className='flex2 favorites-container around scrollbar'>
                    {!userData.savedPalettes.length && (
                        <p>Please save some color palettes</p>
                    )}
                    {userData.savedPalettes.map((palette) => {

                        return (
                            <section className='color-palette' key={palette._id}>
                                <div className='colors' style={{ backgroundColor: palette.color1 }}>{palette.color1}</div>
                                <div className='colors' style={{ backgroundColor: palette.color2 }}>{palette.color2}</div>
                                <div className='colors' style={{ backgroundColor: palette.color3 }}>{palette.color3}</div>
                                <button className='remove-button' onClick={() => handleRemovePalette(palette.id)}>Remove Palette</button>
                            </section>
                        )
                    })}
                </div>
            </div>
            <div className='width'>
                <h5 style={{ fontFamily: 'Bungee Shade' }} className='group-title'>My Fonts</h5>
                <div className='flex2 favorites-container around scrollbar'>
                    {!userData.savedFonts.length && (
                        <p>Please save some fonts</p>
                    )}
                    {userData.savedFonts.map((font) => {
                        loadWebFont(font);
                        return (
                            <section className='saved-font' key={font._id}>
                                <div style={{ fontFamily: font.chosenFont }}>{font.chosenFont}</div>
                                <button className='remove-button' onClick={() => handleRemoveFont(font.chosenFont)}>Remove Font</button>
                            </section>
                        )
                    })}
                </div>
            </div>
            <div className='width'>
                <h5 style={{ fontFamily: 'Bungee Shade' }} className='group-title'>My Images</h5>
                <div className='flex2 favorites-container around scrollbar'>
                    {!userData.savedImages.length && (
                        <p>Please save some images</p>
                    )}
                    {userData.savedImages.map((image) => {
                        return (
                            <section className='flex2 column image-container' key={image._id}>
                                <img className='saved-image' src={image.small} alt={image.alt}></img>
                                <button className='remove-button' onClick={() => handleRemoveImage(image.imageId)}>Remove Image</button>
                            </section>
                        )
                    })}
                </div>
            </div>
        </main>
    );
};

export default Favorites;