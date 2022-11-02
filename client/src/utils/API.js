import WebFont from 'webfontloader';

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
    return data; 
    }
};

export const randomFont = () => {
    let fontsList = [];

    async function loadFontsList() {
        try {
            const result = await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.REACT_APP_FONT_KEY}`);
            const data = await result.json();
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

        return choosedFont;
    }

    async function main() {
        fontsList = await loadFontsList();
        const choosedFont = loadRandomFont(fontsList);
        return choosedFont;
    }
    main();
    return main();
}