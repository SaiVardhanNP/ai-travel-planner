import React from 'react'
import Placeholder from '../../../public/Placeholder'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

const Hotels = ({trip}) => {

    const imageurl="https://atvyyc.net/wp-content/uploads/2022/10/307489118_10166743919940511_8771939586354675560_n.jpg"
  return (
    <div>
      <h2 className='text-xl font-bold my-2'>Hotel Recommendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 my-5'>
        {
            trip?.TripData?.hotels.map((item,index)=>{
                return(

                     <HotelCardItem index={index} item={item}/>
                )
            })
        }
      </div>
    </div>
  )
}

export default Hotels
