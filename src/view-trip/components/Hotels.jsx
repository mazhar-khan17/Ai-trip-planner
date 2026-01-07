import React from 'react'
import HotelCardItem from './HotelCardItem'

const Hotels = ({ trip }) => {

    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
                {trip?.tripData?.HotelOptions?.map((hotel, index) => (
                   <HotelCardItem key={index} hotel={hotel} index={index} trip={trip} />
                ))}
            </div>

        </div>
    )
}

export default Hotels   