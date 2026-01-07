import axios from 'axios';

const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

const searchPlaceImages = async (query) => {
  const res = await axios.get('https://api.unsplash.com/search/photos', {
    params: {
      query: query,
      per_page: 5,  // Number of images
    },
    headers: {
      Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
    }
  });

  // Return an array of image URLs
  return res.data.results.map(img => img.urls.regular);
};

export default searchPlaceImages;