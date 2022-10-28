import WebFont from 'webfontloader';

// "https://api.pexels.com/v1/search?query=nature&per_page=1"
export const searchImage = (query) => {
    return fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`);
};

// let WebFont; //this was added, likely needs to be removed
export const randomFont = () => {
    const API_KEY = 'AIzaSyDDiO8nLVRMDaXwrJp61Cdcar5gFmmiR1Q';
    let fontsList = [];

    async function loadFontsList() {
        try {
            const result = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY);
            const data = await result.json();
            console.log('loaded google fonts list: ', data.items.length);
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


        console.log('choosed font: ', choosedFont);
        return choosedFont;
    }

    async function main() {
        fontsList = await loadFontsList();
        const choosedFont = loadRandomFont(fontsList);
        console.log(choosedFont, "MAIN FUNCTION RETURMN");
        return choosedFont;
    }

    main();
    return main();
}