// "https://api.pexels.com/v1/search?query=nature&per_page=1"
export const searchImage = (query) => {
    return fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`);
  };