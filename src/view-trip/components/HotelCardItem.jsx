import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const HotelCardItem = ({ hotel, index, trip }) => {

    const [imageURL, setImageURL] = useState()

    useEffect(() => {
        hotel && GetPlacePhoto();
    }, [hotel])

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: hotel?.HotelName
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
        <Link to={'https://www.google.com/maps/search/?api=1&query=' + hotel?.HotelName + "," + hotel?.HotelAddress} target='_black'>
            <div key={index} className='hover:scale-105 transition-all cursor-pointer'>
                <img className='rounded-lg' src={imageURL || '/default-hotel.jpg'} alt='loading images' />
                <div className='my-2 flex flex-col gap-1'>
                    <h2 className='font-medium'>{hotel?.HotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.HotelAddress}</h2>
                    <div className='flex gap-4'>
                        <h2 className='text-sm'>💰 {hotel?.PriceRange},</h2>
                        <h2 className='text-sm'>⭐ {hotel?.Rating}</h2>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default HotelCardItem