import React from 'react'
import { FaMapLocation } from "react-icons/fa6";
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PHOTO_REF_URL } from '../../service/GlobalApi';
import { GetPlaceDetails } from '../../service/GlobalApi';
import { imageurl } from '../../service/GlobalApi';

import Placeholder from '../../../public/Placeholder'
import { Button } from '../../components/ui/button';

const PlaceCard = ({ place }) => {


    const [photoUrl, setPhotoUrl] = useState();
    useEffect(() => {
        place && getPlacePhoto()
    }, [place])

    const getPlacePhoto = async () => {
        const data = {
            textQuery: place?.placeName
        }
        const result = await GetPlaceDetails(data).then((res) => {
            console.log(res.data.places[0].photos[0].name);
            const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", res.data.places[0].photos[9].name)
            console.log(PhotoUrl);
            setPhotoUrl(PhotoUrl)
        })
    }

    return (
        <Link to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName} target='_blank'>
            <div className='border hover:scale-105 transition-all hover:shadow-md cursor-pointer border-gray-400 flex gap-4 p-2 mt-2 rounded-xl'>
                <img src={photoUrl?photoUrl:imageurl} className='w-[130px] object-cover rounded-xl h-[130px]' alt="" />
                <div>
                    <h2 className=' font-bold text-lg'>{place.placeName}</h2>
                    <h2 className='text-sm font-normal text-gray-600'>{place.placeDetails}</h2>
                    <h2 className='mt-2 text-md font-medium'>{place.timeToVisit}</h2>

                </div>
            </div>
        </Link>
    )
}

export default PlaceCard
