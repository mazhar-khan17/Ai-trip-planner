import React from 'react'
import PlaceCardItem from './PlaceCardItem'

const PlacesToVisit = ({ trip }) => {
    return (
        <div>
            <h2 className='font-bold text-xl mt-5'>Places to Visit</h2>
            <div>
                {(Array.isArray(trip?.tripData?.Itinerary)
                    ? trip.tripData.Itinerary
                    : [trip?.tripData?.Itinerary]
                ).map((item, index) => (
                    <div key={index}>
                        <h2 className='font-medium text-lg mt-2'>{item?.Day}</h2>
                        <div className='grid md:grid-cols-2 gap-5'>
                            {item?.Plan?.map((place, i) => (
                                <div key={i} className='my-2'>
                                    <h2 className='font-medium text-sm text-orange-600'>{place?.Time}</h2>
                                    <PlaceCardItem place={place} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default PlacesToVisit