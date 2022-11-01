import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { SAVE_IMAGE, SAVE_FONT, SAVE_PALETTE } from '../utils/mutations';
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { searchImage, randomFont } from '../utils/API';
import { saveImageIds, getSavedImageIds } from '../utils/localStorage';
import WebFont from 'webfontloader';
import { colors } from '../utils/mockcolors';
import { callbackify } from 'util';

const Home = () => {

    const [searchedImage, setSearchedImage] = useState({ photographer: '', small: '' });

    const [searchInput, setSearchInput] = useState('');
    const [savedImageIds, setSavedImageIds] = useState(getSavedImageIds());
    const [randomizedFont, setRandomizedFont] = useState('Style');

    const [randomizedPalette, setRandomizedPalette] = useState({ id: "0", color1: 'red', color2: 'green', color3: 'blue' });

    const [saveImage] = useMutation(SAVE_IMAGE);
    const [saveFont] = useMutation(SAVE_FONT);
    const [savePalette] = useMutation(SAVE_PALETTE);
    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || []
    const [paletteIds, setPaletteIds] = useState([]);
    const [isSavedPalette, setIsSavedPalette] = useState(true)
    const [paletteToSave, setPaletteToSave] = useState('')

    useEffect(() => {
        paletteIds.push(paletteToSave)
        //console.log(paletteIds)
        setIsSavedPalette(paletteIds?.some((ids) => ids === randomizedPalette.id))
        //console.log(isSavedPalette)
    })

    const handleSaveImage = async (imageId) => {
        const imageToSave = searchedImage.find((image) => image.id === image.id);
        console.log(imageToSave);
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if (!token) {
            console.log("TOKEN ERROR!");
            return false;
        }
        try {
            console.log("TRY saveImage");
            await saveImage({
                variables: { ...imageToSave },
            });
            setSavedImageIds([...savedImageIds, imageToSave.id]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleRandomFont = async (event) => {
        const font = await randomFont();
        console.log(font, "handleRandomFont FONT VALUE!");
        setRandomizedFont(font);
        return font;
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
    };

    const handlePhotoData = async (event) => {
        event.preventDefault();
        console.log("Hello")
        console.log(searchInput);
        const photoData = await searchImage(searchInput)
        console.log(photoData, "Click")
        const photographer = photoData.photographer
        const small = photoData.photos[0].src.small
        setSearchedImage({ photographer: photographer, small: small })
        setSearchInput('')
    };

    const handleSavePalette = async (randomizedPalette) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log(token);
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
        //console.log(randomizedFont);
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        const chosenFont = { chosenFont: randomizedFont }
        //console.log(chosenFont);
        try {
            await saveFont({
                variables: { ...chosenFont }
            });
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <>
            <div className="container">
                <div className=" row color-palette">
                    <div className="col-12">
                        <div style={{ backgroundColor: randomizedPalette.color1 }}>
                            {randomizedPalette.color1}
                        </div>
                        <div style={{ backgroundColor: randomizedPalette.color2 }}>
                            {randomizedPalette.color2}
                        </div>
                        <div style={{ backgroundColor: randomizedPalette.color3 }}>
                            {randomizedPalette.color3}
                        </div>
                        <button onClick={() => handleRandomColors()}>Randomize!</button>
                        {Auth.loggedIn() && (
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
            <div className="row">
                <form onSubmit={handlePhotoData} className="col-6 image-search">
                    <div>
                        <img src={searchedImage.small} alt="searched image"></img>
                    </div>
                    <div className="mx-2 mt-2">
                        <input type="text" placeholder="Image Keyword" name="searchInput" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                        <button className="mt-2 mx-2" type='submit'>Submit</button>
                    </div>
                </form>
                <div className="font-box col-6">
                    <div className="box" style={{ fontFamily: randomizedFont }}>{randomizedFont}</div>

                    <button onClick={() => handleRandomFont()}>Randomize!</button>
                    {Auth.loggedIn() && ( 
                    <button onClick={() => handleSaveFont(randomizedFont)}>TESTING FONT</button>
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
