import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { SelectBudgetOptions, SelectTravelersList } from '../constants/options';
import { toast } from 'sonner';

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData,setFormData]=useState([]);

  function handleInputChange(name,value){

    
    setFormData(
      {...formData,
      [name]:value
    })
  }
  useEffect(()=>{
    console.log(formData);
  },[formData])

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

  const OnGenerateTrip=()=>{
    if(formData?.noOfDays>5&&!formData?.location || !formData?.budget||!formData?.people){
      toast("Please fill all details.")
      return;
    }
    console.log(formData);
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-35 xl:px-30 px-5 mt-10'>
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
                placeholder: "Enter your place",
                place,
                onChange: (place) => { setFormData(place) },
              }}
            />
          ) : (
            <p>Loading Google Maps...</p>
          )}
        </div>
        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input onChange={(e)=>handleInputChange("noOfDays",e.target.value)} min="1" max="50" type="number" placeholder={"Eg.3"} />
        </div>
      </div>
      <div className='mt-15'>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
        <p className='text-gray-500 text-xl mt-2'>
        The budget is exclusively allocated for activities and dining purposes.
      </p>
        <div className='grid grid-cols-3 gap-5 mt-6'>
          {
            SelectBudgetOptions.map((item, index) => (
              <div onClick={()=>{handleInputChange("budget",item.title)}}  className={`${formData.budget===item.title && "shadow-lg border border-black"}  col-span-3 sm:col-span-1 cursor-pointer rounded-lg hover:shadow-lg p-5`} key={index}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))
          }
        </div>
      </div>
       <div className='mt-15'>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
        
        <div className='grid grid-cols-3 gap-5 mt-6'>
          {
            SelectTravelersList.map((item, index) => (
              <div  onClick={()=>{handleInputChange("people",item.people)}} className={`${formData.people===item.people && "shadow-lg border border-black"}  col-span-3 sm:col-span-1 cursor-pointer rounded-lg hover:shadow-lg p-5`} key={index}>
                <h2 className='text-4xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))
          }
        </div>
      </div>
      <div className='my-10 flex justify-end'>
      <Button onClick={OnGenerateTrip}>Generate Trip</Button>
      </div>

    </div>
  );
};

export default CreateTrip;
