import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_IMAGE, SAVE_FONT, SAVE_PALETTE } from '../utils/mutations';
import Auth from '../utils/auth';
import { searchImage, randomFont } from '../utils/API';
import { saveImageIds, getSavedImageIds } from '../utils/localStorage';
import WebFont from 'webfontloader';
import { colors } from '../utils/mockcolors';


const Home = () => {

    const [searchedImage, setSearchedImage] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [savedImageIds, setSavedImageIds] = useState(getSavedImageIds());

    const [randomizedFont, setRandomizedFont] = useState('Your Font Here!');

    const [randomizedPalette, setRandomizedPalette] = useState({id: "1", color1: 'red', color2: 'green', color3: 'blue'});

    const [saveImage] = useMutation(SAVE_IMAGE);

    const [saveFont] = useMutation(SAVE_FONT);

    const [savePalette] = useMutation(SAVE_PALETTE);

    // useEffect(() => {
    //     return () => saveImageIds(savedImageIds), randomFont(randomizedFont), randomPalette(randomizedPalette);
    // });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (!searchInput) {
            return false;
        }

        try {
            const response = await searchImage(searchInput);

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const { items } = await response.json();

            const imageData = items.map((image) => ({
                id: image.id,
                width: image.width,
                height: image.height,
                photographer: image.photographer,
                src: image.src.original,
                alt: image.alt,
            }));

            setSearchedImage(imageData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

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

    //there is a conditional for the save image button which may need to be removed

    const handleRandomFont = async (event) => {
            const font = await randomFont();
            console.log(font, "handleRandomFont FONT VALUE!");
            setRandomizedFont(font);
            return font;
    };

    const handleRandomColors = async () => {
        const randomIndex = colors[Math.floor(Math.random()*colors.length)]
        let id = randomIndex.id;
        let color1 = randomIndex.color1;
        let color2 = randomIndex.color2;
        let color3 = randomIndex.color3;
        setRandomizedPalette({id: id, color1: color1, color2: color2, color3: color3})
        console.log(randomizedPalette);
    };

    const handleSavePalette = async(randomizedPalette) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log(token);
        if (!token) {
          return false;
        }
        try {
            await savePalette({
                variables: { ...randomizedPalette }
            })
        } catch(err) {
            console.error(err);
        }
    };
    const handleSaveFont = async(randomizedFont) => {
        console.log('Click');
        console.log(randomizedFont);
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log(token);
        if (!token) {
          return false;
        }
        const chosenFont = { chosenFont: randomizedFont}
        console.log(chosenFont);
        try {
            await saveFont({
                variables: { ...chosenFont }
            });
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <>
            <div>
                Home Page!
            </div>
            <form id="image-search" onSubmit={handleFormSubmit}>
                <div>
                    <label htmlFor="search">Search Images:</label>
                    <input type="text" defaultValue={searchInput} name="searchInput" />
                </div>
                <div>
                    "IMAGE HERE"
                </div>
                <button type="submit">Submit</button>
                {/* {searchedImage.map((image) => {
                    return(
                <button onClick={() => handleSaveImage(image.id)}>
                    {savedImageIds?.some((savedImageId) => savedImageId === image.id)
                        ? 'This image has already been saved!'
                        : 'Save this Image!'}
                </button>
               )})} */}
            </form>
            <div className="container">
                <div className="box" style={{fontFamily: randomizedFont}}>{randomizedFont}</div>

                <button onClick={() => handleRandomFont()}>Randomize!</button>
                <button onClick={() => handleSaveFont(randomizedFont)}>TESTING FONT</button>
            </div>
            <div className="container">
                <div style={{backgroundColor: randomizedPalette.color1}}>
                    {randomizedPalette.color1}
                </div>
                <div style={{backgroundColor: randomizedPalette.color2}}>
                    {randomizedPalette.color2}
                </div>
                <div style={{backgroundColor: randomizedPalette.color3}}>
                    {randomizedPalette.color3}
                </div>
                <button onClick={() => handleRandomColors()}>Randomize!</button>
                <button onClick={() => handleSavePalette(randomizedPalette)}>TESTING PALETTE</button>
            </div>
        </>

    );
};



export default Home;