import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/GlobalApi';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoIosSend } from "react-icons/io";




const InfoSection = ({ trip }) => {

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
    return `${img.urls.raw}&w=1000&h=340&fit=crop`;
  };

  return (
    <div>
      <img className='h-[340px] w-[1000px] object-cover rounded-xl border' src={imageURL || "/default-place.webp"} alt='main image...' />

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
          <div className='flex gap-4'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🗓️ {trip?.userSelection?.day} Days</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>💰 {trip?.userSelection?.budget} Budget</h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md'>🥂 No. of Traveler: {trip?.userSelection?.traveler}</h2>
          </div>
        </div>

        <Button><IoIosSend /></Button>
      </div>


    </div>
  )
}

export default InfoSection          