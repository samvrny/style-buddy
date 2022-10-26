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
        // find the book in `searchedBooks` state by the matching id
        const imageToSave = searchedImage.find((image) => image.id === id);
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
                <button onClick={() => handleSaveImage(image.id)}>
                    {savedImageIds?.some((savedImageId) => savedImageId === image.id)
                        ? 'This image has already been saved!'
                        : 'Save this Image!'}
                </button>
            </form>
            <div class="container">
                <div class="box">Random Google Font</div>
                <button onClick={() => setRandomizedFont(randomFont())}>Randomize!</button>
            </div>
            <div class="container">
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