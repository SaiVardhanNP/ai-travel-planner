import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';

const CreateTrip = () => {
  const [place,setPlace]=useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoaded(true);
    } else {
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          setIsLoaded(true);
          clearInterval(interval);
        }
      }, 500);
    }
  }, []);

  return (
    <div className='sm:px-10 md:px-32 lg:px-6 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='text-gray-500 text-xl mt-2'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div className='mt-20 flex flex-col gap-8'>
        <div >
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          {isLoaded ? (
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                placeholder:"Enter your place",
                place,
                onChange: (place) =>{ setPlace(place); console.log(place)},
              }}
            />
          ) : (
            <p>Loading Google Maps...</p>
          )}
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input min="1" type="number" placeholder={"Eg.3"}/>
        </div>
      </div>
    </div>
  );
};

export default CreateTrip;
