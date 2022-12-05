import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_IMAGE, SAVE_FONT, SAVE_PALETTE } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { searchImage, randomFont } from '../utils/API';
import WebFont from 'webfontloader';
import { colors } from '../utils/mockcolors';

const Home = () => {
    const [searchedImage, setSearchedImage] = useState({ id: '2292837', photographer: 'Ekrulila', small: 'https://images.pexels.com/photos/2292837/pexels-photo-2292837.jpeg?auto=compress&cs=tinysrgb&h=130', alt: "Person Holding White Scroll" });
    const [searchInput, setSearchInput] = useState('');
    const [randomizedFont, setRandomizedFont] = useState('Style');
    const [randomizedPalette, setRandomizedPalette] = useState({ id: "0", color1: 'Red', color2: 'Green', color3: 'Blue' });

    const [saveImage] = useMutation(SAVE_IMAGE);
    const [saveFont] = useMutation(SAVE_FONT);
    const [savePalette] = useMutation(SAVE_PALETTE);
    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || []
    const [paletteIds, setPaletteIds] = useState([]);
    const [isSavedPalette, setIsSavedPalette] = useState(true)
    const [paletteToSave, setPaletteToSave] = useState('')

    const [fontNames, setFontNames] = useState([]);
    const [isSavedFont, setIsSavedFont] = useState(true);
    const [fontToSave, setFontToSave] = useState('');

    const [imageIds, setImageIds] = useState([]);
    const [isSavedImage, setIsSavedImage] = useState(true);
    const [imageToSave, setImageToSave] = useState('')

    const [onLoadColor, setOnloadColor] = useState(true)
    const [onLoadFont, setOnLoadFont] = useState(true)
    const [onLoadImage, setOnLoadImage] = useState(true)

    useEffect(() => {
        paletteIds.push(paletteToSave)
        fontNames.push(fontToSave)
        imageIds.push(imageToSave)
        setIsSavedPalette(paletteIds?.some((ids) => ids === randomizedPalette.id))
        setIsSavedFont(fontNames?.some((names) => names === randomizedFont))
        setIsSavedImage(imageIds?.some((ids) => ids === searchedImage.imageId))
    })

    const handleRandomFont = async (event) => {
        const font = await randomFont();
        setRandomizedFont(font);
        setOnLoadFont(false)

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        userData.savedFonts.map((font) => {
            fontNames.push(font)
        })
    };

    const handleRandomColors = async () => {
        const randomIndex = colors[Math.floor(Math.random() * colors.length)]
        let id = randomIndex.id;
        let color1 = randomIndex.color1;
        let color2 = randomIndex.color2;
        let color3 = randomIndex.color3;
        setRandomizedPalette({ id: id, color1: color1, color2: color2, color3: color3 })

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        userData.savedPalettes.map((palette) => {
            paletteIds.push(palette.id)
        })
        setOnloadColor(false)
    };

    const handlePhotoData = async (event) => {
        event.preventDefault();
        const photoData = await searchImage(searchInput)
        const photographer = photoData.photos[0].photographer
        const small = photoData.photos[0].src.medium
        const imageId = photoData.photos[0].id
        const string = `${imageId}`
        const alt = photoData.photos[0].alt
        setSearchedImage({ photographer: photographer, small: small, imageId: string, alt: alt })
        setSearchInput('')
        setOnLoadImage(false)

        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        userData.savedImages.map((image) => {
            imageIds.push(image.imageId)
        })
    };

    const handleSavePalette = async (randomizedPalette) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            return false;
        }
        try {
            savePalette({
                variables: { ...randomizedPalette }
            })
        } catch (err) {
            console.error(err);
        }
        userData.savedPalettes.map((palette) => {
            paletteIds.push(palette.id)
        })
        setPaletteToSave(randomizedPalette.id)
    };

    const handleSaveFont = async (randomizedFont) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        const chosenFont = { chosenFont: randomizedFont }
        try {
            await saveFont({
                variables: { ...chosenFont }
            });
        } catch (err) {
            console.error(err);
        }
        userData.savedFonts.map((font) => {
            paletteIds.push(font)
        })
        setFontToSave(randomizedFont)
    }

    const handleSaveImage = async (searchedImage) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        try {
            await saveImage({
                variables: { ...searchedImage }
            });
        } catch (err) {
            console.error(err);
        }
        userData.savedImages.map((image) => {
            imageIds.push(image.id)
        })
        setImageToSave(searchedImage.imageId)
    };

    const loadWebFont = async () => {
        WebFont.load({
            google: {
                families: ['Bungee Shade']
            }
        });
    }

    loadWebFont()


    return (
        <>
            <main className='flex column'>
                <section className='color-box flex2'>
                    <h3 style={{ fontFamily: 'Bungee Shade' }} className='fir-h3'>Palette Picker</h3>
                    <div className='flex2 palette-box'>
                        <div className="colors flex2 column" style={{ backgroundColor: randomizedPalette.color1 }}>
                            <p>{randomizedPalette.color1}</p>
                        </div>
                        <div className="colors flex2 column" style={{ backgroundColor: randomizedPalette.color2 }}>
                            <p>{randomizedPalette.color2}</p>
                        </div>
                        <div className="colors flex2 column" style={{ backgroundColor: randomizedPalette.color3 }}>
                            <p>{randomizedPalette.color3}</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => handleRandomColors()}>Randomize!</button>
                        {onLoadColor || Auth.loggedIn() && (
                            <button
                                disabled={isSavedPalette}
                                onClick={() => handleSavePalette(randomizedPalette)}>
                                {isSavedPalette
                                    ? 'Palette Saved'
                                    : 'Save Palette'
                                }
                            </button>
                        )}
                    </div>
                </section>
                <section className='flex column'>
                    <div className="font-box flex2 column">
                        <h3 style={{ fontFamily: 'Bungee Shade' }}>Font Finder</h3>
                        <div className='displayed-font flex2'>
                            <div style={{ fontFamily: randomizedFont }}>{randomizedFont}</div>
                        </div>
                        <div>
                            <button onClick={() => handleRandomFont()}>Randomize!</button>
                            {onLoadFont || Auth.loggedIn() && (
                                <button
                                    className='media-575'
                                    disabled={isSavedFont}
                                    onClick={() => handleSaveFont(randomizedFont)}>
                                    {isSavedFont
                                        ? 'Font Saved'
                                        : 'Save Font'
                                    }
                                </button>
                            )}
                        </div>
                    </div>
                    <div className='image-box flex2 column'>
                        <h3 style={{ fontFamily: 'Bungee Shade' }}>Image Inquirer</h3>
                        <form onSubmit={handlePhotoData} className="image-search">
                            <div>
                                <input className='image-input' type="text" placeholder="Image Keyword" name="searchInput" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                                <button className='image-button' type='submit'>Submit</button>
                            </div>
                            <div className='image-holder flex2'>
                                <img className='image flex2' src={searchedImage.small} alt="searched image"></img>
                            </div>
                        </form>
                        {onLoadImage || Auth.loggedIn() && (
                            <button
                                disabled={isSavedImage}
                                className="save-image"
                                onClick={() => handleSaveImage(searchedImage)}>
                                {isSavedImage
                                    ? 'Image Saved'
                                    : 'Save Image'
                                }
                            </button>
                        )}
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;