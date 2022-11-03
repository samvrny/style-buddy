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
        const small = photoData.photos[0].src.small
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

    return (
        <>
            <div className="container">
                <div className=" row color-palette">
                    <div className="col-12">
                        <h3 className='fir-h3'>Palettes</h3>
                        <div className="colors" style={{ backgroundColor: randomizedPalette.color1 }}>
                            {randomizedPalette.color1}
                        </div>
                        <div className="colors" style={{ backgroundColor: randomizedPalette.color2 }}>
                            {randomizedPalette.color2}
                        </div>
                        <div className="colors" style={{ backgroundColor: randomizedPalette.color3 }}>
                            {randomizedPalette.color3}
                        </div>
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
                </div>
            </div>
            <div className="row flex">
                <div className="col-6">
                <form onSubmit={handlePhotoData} className="image-search">
                    <div>
                    <h3 className='sec-h3'>Images</h3>
                        <img className='image' src={searchedImage.small} alt="searched image"></img>
                    </div>
                    <div>
                        <input type="text" placeholder="Image Keyword" name="searchInput" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <button className="mt-2 mx-2" type='submit'>Submit</button>
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
                <div className="font-box col-6">
                    <h3 className='sec-h3'>Fonts</h3>
                    <div className="box" style={{ fontFamily: randomizedFont }}>{randomizedFont}</div>
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
        </>
    );
};

export default Home;
