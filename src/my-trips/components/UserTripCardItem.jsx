import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UserTripCardItem = ({ trip }) => {

    const [imageURL, setImageURL] = useState()

    useEffect(() => {
        trip && GetPlacePhoto();
    }, [trip])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location
        }
        const image = await searchPlaceImages(data.textQuery);
        setImageURL(image)
    }

    const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_KEY;

    const searchPlaceImages = async (query) => {
        const res = await axios.get('https://api.unsplash.com/search/photos', {
            params: {
                query: query,
                per_page: 1,  // Only one image
            },
            headers: {
                Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
            }
        });

        // Safely get the first image URL
        const img = res.data.results[0];
        if (!img) return null; // no results found
        return `${img.urls.raw}&w=300&h=195&fit=crop`;
    };

    return (
        <Link to={'/view-trip/'+ trip?.id}>
            <div className='mt-5 hover:scale-105 transition-all'>
                <img src={imageURL ? imageURL : "/download.jpg"} alt="" className='object-cover rounded-xl' />
                <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
                <h2 className='text-sm text-gray-500'>{trip?.userSelection?.day} Days trip with {trip?.userSelection?.budget} Budget.</h2>
            </div>
        </Link>
    )
}

export default UserTripCardItem 