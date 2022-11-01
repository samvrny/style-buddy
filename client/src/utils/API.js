import WebFont from 'webfontloader';

<<<<<<< HEAD
// "https://api.pexels.com/v1/search?query=nature&per_page=1"
export const searchImage = (query) => {
    return fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`);
};

// let WebFont; //this was added, likely needs to be removed
export const randomFont = () => {
    const API_KEY = 'AIzaSyDDiO8nLVRMDaXwrJp61Cdcar5gFmmiR1Q';
=======
// "https://api.pexels.com/v1/search?query=nature&per_page=1" NOTE: removed (query) for testing
export const searchImage = async (searchInput) => {

    const response = await fetch(`https://api.pexels.com/v1/search?query=${searchInput}&per_page=1`, {
        method: 'GET',
        headers: {"Authorization": `${process.env.REACT_APP_IMAGE_KEY}`}
    } );
    const data = await response.json();

    if (!response.ok || !data.photos.length) {
         return {
            photos: [{
                src: {
                    small: "https://images.pexels.com/photos/709732/pexels-photo-709732.jpeg?auto=compress&cs=tinysrgb&h=130"
                }
            }]
         }
    } else {
    console.log(data);
    return data; 
    }
};

export const randomFont = () => {
    // const API_KEY = process.env.REACT_APP_FONT_KEY
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
    let fontsList = [];

    async function loadFontsList() {
        try {
<<<<<<< HEAD
            const result = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY);
            const data = await result.json();
            console.log('loaded google fonts list: ', data.items.length);
=======
            const result = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.REACT_APP_FONT_KEY}`);
            const data = await result.json();
            //console.log('loaded google fonts list: ', data.items.length);
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
            return data.items;
        } catch (error) {
            console.log('loadFontsList', error, error.message);
        }
    }
    function loadRandomFont(fontsList) {
        const randomIndex = Math.floor(Math.random() * fontsList.length);
        const choosedFont = fontsList[randomIndex].family;
        WebFont.load({
            google: {
                families: [choosedFont]
            }
        });

<<<<<<< HEAD

        console.log('choosed font: ', choosedFont);
=======
        //console.log('choosed font: ', choosedFont);
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
        return choosedFont;
    }

    async function main() {
        fontsList = await loadFontsList();
        const choosedFont = loadRandomFont(fontsList);
<<<<<<< HEAD
        console.log(choosedFont, "MAIN FUNCTION RETURMN");
=======
        //console.log(choosedFont, "MAIN FUNCTION RETURN");
>>>>>>> 2f855a55ba0b3010585e49baa818076294ed60b4
        return choosedFont;
    }

    main();
    return main();
}