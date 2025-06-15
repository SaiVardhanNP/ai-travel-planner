import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { imageurl } from '../../service/GlobalApi'
import { GetPlaceDetails,PHOTO_REF_URL, } from '../../service/GlobalApi'

const HotelCardItem = ({item,index}) => {
        const imageurl="https://atvyyc.net/wp-content/uploads/2022/10/307489118_10166743919940511_8771939586354675560_n.jpg"
         const [photoUrl,setPhotoUrl]=useState();
             useEffect(()=>{
                item&& getPlacePhoto()
             },[item])
         
             const getPlacePhoto=async()=>{
                 const data={
                     textQuery:item?.hotelName
                 }
                 const result= await GetPlaceDetails(data).then((res)=>{
                     console.log(res.data.places[0].photos[0].name);
                     const PhotoUrl=PHOTO_REF_URL.replace("{NAME}",res.data.places[0].photos[9].name)
                     console.log(PhotoUrl);
                     setPhotoUrl(PhotoUrl)
                 })
             }   
  return (
    
      <Link key={index} to={"https://www.google.com/maps/search/?api=1&query="+item?.hotelName+","+item?.hotelAddress} target='_blank'>
                <div key={index} className=' hover:scale-105 transition-all cursor-pointer' >
                    <img className='rounded-xl h-[180px] object-cover w-full' src={photoUrl?photoUrl:imageurl} key={index} alt="" />
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-xl font-bold'>{item?.hotelName}</h2>
                        <h2 className='text-xs font-medium text-gray-660'>📍 {item?.hotelAddress}</h2>
                        <h2 className='text-s font-medium '>💸 {(item?.price!="$$$")?item?.price:"Contact Hotel"}</h2>
                        <h2 className='text-s font-medium '>⭐ {item?.rating}</h2>
                    </div>
                   

                </div>
                 </Link>

  )
}

export default HotelCardItem
