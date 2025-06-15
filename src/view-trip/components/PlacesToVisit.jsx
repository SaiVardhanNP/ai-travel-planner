import React from 'react'
import PlaceCard from './PlaceCard'

const PlacesToVisit = ({trip}) => {
  return (
    <div>
      <h2 className='font-bold text-lg'>Places to Visit</h2>
      {
        trip?.TripData?.itinerary.map((item,index)=>(
            <div key={index}>
                <h2 className='font-medium text-lg'> {item?.day}</h2>
                <div className='grid gap-5 md:grid-cols-2'>
                {
                    item?.plan.map((place,index)=>(
                        <div className='my-3'>
                        <PlaceCard place={place}/>
                        </div>
                    ))
                }
                </div>
            </div>
        ))
      }
    </div>
  )
}

export default PlacesToVisit
