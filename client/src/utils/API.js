import WebFont from 'webfontloader';



// "https://api.pexels.com/v1/search?query=nature&per_page=1" NOTE: removed (query) for testing
export const searchImage = async (searchInput) => {

    const response = await fetch(`https://api.pexels.com/v1/search?query=${searchInput}&per_page=1`, {
        method: 'GET',
        headers: {"Authorization": "563492ad6f91700001000001d4bda0cf64fd49a4b6ae703c5761017e"}
    } );
    const data = await response.json();
    console.log(data);
    return data; 
};

export const randomFont = () => {
    const API_KEY = 'AIzaSyDDiO8nLVRMDaXwrJp61Cdcar5gFmmiR1Q';
    let fontsList = [];

    async function loadFontsList() {
        try {
            const result = await fetch('https://www.googleapis.com/webfonts/v1/webfonts?key=' + API_KEY);
            const data = await result.json();
            //console.log('loaded google fonts list: ', data.items.length);
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

        //console.log('choosed font: ', choosedFont);
        return choosedFont;
    }

    async function main() {
        fontsList = await loadFontsList();
        const choosedFont = loadRandomFont(fontsList);
        //console.log(choosedFont, "MAIN FUNCTION RETURN");
        return choosedFont;
    }

    main();
    return main();
}