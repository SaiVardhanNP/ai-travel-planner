import React, { useEffect, useState } from 'react'
import Placeholder from '../../../public/Placeholder'
import { IoSend } from "react-icons/io5";
import { PHOTO_REF_URL } from '../../service/GlobalApi';
import { Button } from '../../components/ui/button'
import { GetPlaceDetails } from '../../service/GlobalApi';

import { PLACEHOLDER_URL } from '../../service/GlobalApi';


const Information = ({ trip }) => {
    const [photoUrl,setPhotoUrl]=useState();
    useEffect(()=>{
       trip&& getPlacePhoto()
    },[trip])

    const getPlacePhoto=async()=>{
        const data={
            textQuery:trip?.TripData?.location
        }
        const result= await GetPlaceDetails(data).then((res)=>{
            console.log(res.data.places[0].photos[0].name);
            const PhotoUrl=PHOTO_REF_URL.replace("{NAME}",res.data.places[0].photos[9].name)
            console.log(PhotoUrl);
            setPhotoUrl(PhotoUrl)
        })
    }
    return (
        <div>
            <img className='h-[240px]  w-full object-cover  rounded-xl' src={photoUrl?photoUrl:PLACEHOLDER_URL} alt="" />
            <div className='flex justify-between items-center'>

            <div className='my-5 flex flex-col gap-'>
                <h2 className='font-bold text-2xl'>{trip?.TripData?.location}</h2>

                <div className='flex gap-2 my-5'>
                    <h2 className='p-1 text-center px-3 bg-gray-200 rounded-full text-gray-620 text-sm md:text-md'>📅 {trip?.TripData?.duration}</h2>
                    <h2 className='p-1 px-3 bg-gray-200 text-center text-sm md:text-md rounded-full text-gray-620'>💸 {trip?.TripData?.budget} Budget</h2>
                    <h2 className='p-1 text-sm md:text-md px-3 text-center bg-gray-200 rounded-full text-gray-620'>🥂 No.of Travellers : {trip?.TripData?.travelers}</h2>
                </div>
                
            </div>
             <Button><IoSend/></Button>

            </div>
        </div>
    )
}

export default Information
