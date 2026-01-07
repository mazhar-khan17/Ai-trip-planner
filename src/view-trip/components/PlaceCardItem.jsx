import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PlaceCardItem = ({ place }) => {

    const [imageURL, setImageURL] = useState()

    useEffect(() => {
        place && GetPlacePhoto();
    }, [place])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: place?.PlaceName
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
        return `${img.urls.raw}&w=340&h=300&fit=crop`;
    };

    return (
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + place?.PlaceName} target='_black'>
            <div className='border rounded-xl p-2 mt-2 flex gap-4 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
                <img src={imageURL ? imageURL : '/download.jpg'}
                    alt=""
                    className='w-[130px] h-[100px] rounded-xl' />
                <div>
                    <h2 className='font-bold text-lg'>{place?.PlaceName}</h2>
                    <p className='text-sm text-gray-400'>{place?.PlaceDetails}</p>
                    <div className='flex items-center gap-4 mt-1'>
                        <p className='text-sm text-gray-500'>💰Ticket Price: <span className='text-gray-900'>{place?.TicketPricing.length > 5 ? 'According Show' : place?.TicketPricing}</span></p>
                        <p>⭐ {place?.Rating}</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PlaceCardItem;