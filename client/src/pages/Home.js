import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { SAVE_IMAGE } from '../utils/mutations';

import Auth from '../utils/auth';
import { searchImage, randomFont, randomPalette } from '../utils/API';
import { saveImageIds, getSavedImageIds } from '../utils/localStorage';


const Home = () => {

    const [searchedImage, setSearchedImage] = useState([]);

    const [searchInput, setSearchInput] = useState('');

    const [savedImageIds, setSavedImageIds] = useState(getSavedImageIds());

    const [randomizedFont, setRandomizedFont] = useState(randomFont());

    const [randomizedPalette, setRandomizedPalette] = useState(randomPalette());

    const [saveImage, { error }] = useMutation(SAVE_IMAGE);

    useEffect(() => {
        return () => saveImageIds(savedImageIds), randomFont(randomizedFont), randomPalette(randomizedPalette);
    });


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

        try {
            const response = await randomFont();
            console.log(response, "handleRandomFont RESPONSE");

            if (!response) {
                throw new Error('something went wrong with randomFont!');
            }

            const font = response
            console.log(font, "handleRandomFont FONT VALUE!");
        } catch (err) {
            //console.error(err, "RANDOM FONT ERROR!");
        }
    };



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
                {searchedImage.map((image) => {
                    return(
                <button onClick={() => handleSaveImage(image.id)}>
                    {savedImageIds?.some((savedImageId) => savedImageId === image.id)
                        ? 'This image has already been saved!'
                        : 'Save this Image!'}
                </button>
               )})}
            </form>
            <div className="container">
                <div className="box">Random Google Font</div>
                <button onClick={() => handleRandomFont()}>Randomize!</button>
            </div>
            <div className="container">
                <div>
                    color 1 left
                </div>
                <div>
                    color 2 center
                </div>
                <div>
                    color 3 right
                </div>
                <button onClick={() => setRandomizedPalette(randomPalette())}>Randomize!</button>
            </div>
        </>

    );
};



export default Home;