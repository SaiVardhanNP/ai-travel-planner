import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelersList } from '../constants/options';
import { toast } from 'sonner';
import { FcGoogle } from "react-icons/fc";
import { db } from '../service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { generateTravelPlanJson } from '../service/AIModel';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CreateTrip = () => {
  const [place, setPlace] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading,setLoading]=useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const navigate=useNavigate();

  function handleInputChange(name, value) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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

  const login=useGoogleLogin({
    onSuccess:(codeResp)=>GetUser(codeResp),
    onError:(error)=>console.log(error)
  } )

  const OnGenerateTrip = async () => {

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label || '')
      .replace('{totalDays}', formData?.noOfDays || '')
      .replace('{traveler}', formData?.people || '')
      .replace('{budget}', formData?.budget || '')
      .replace('{days}', formData?.noOfDays || '');

    const responseText = await generateTravelPlanJson(FINAL_PROMPT);

    if (responseText) {
      try {
        const parsedPlan = JSON.parse(responseText);
        // console.log(parsedPlan);

        const tripData = parsedPlan?.TravelPlan;
        if (!tripData) {
          toast("AI did not return valid trip data.");
          return;
        }

        await SaveAiTrip(tripData);
      } catch (error) {
        console.error("Error parsing response:", error);
        toast("Failed to parse AI response.");
      }
    } else {
      toast("Failed to generate trip plan.");
    }
  };

  const SaveAiTrip = async (TripData) => {
    try {
      setLoading(true);
      // console.log("Saving TripData:", TripData);

      const user = JSON.parse(localStorage.getItem("user"));
      const docId = Date.now().toString();

      const dataToSave = {
        userSelection: formData,
        TripData: TripData,
        userEmail: user?.email ?? "unknown",
        id: docId,
      };

      Object.keys(dataToSave).forEach(
        (key) => dataToSave[key] === undefined && delete dataToSave[key]
      );

      await setDoc(doc(db, "AITrips", docId), dataToSave);
      navigate("/view-trip/"+docId);

      toast("Trip saved successfully!");
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Failed to save trip.");
    } finally {
      setLoading(false);

    }
  };


  const GetUser=(tokenInfo)=>{
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }
    })
    .then((res)=>{
      console.log(res)
      localStorage.setItem("user",JSON.stringify(res.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-35 xl:px-30 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
      <p className='text-gray-500 text-xl mt-2'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-8'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your destination of choice?</h2>
          {isLoaded ? (
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                placeholder: "Enter your place",
                value: place,
                onChange: (place) => {
                  setPlace(place);
                  handleInputChange("location", place);
                },
              }}
            />
          ) : (
            <p>Loading Google Maps...</p>
          )}
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your trip?</h2>
          <Input
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            min="1"
            max="50"
            type="number"
            placeholder="Eg. 3"
          />
        </div>
      </div>

      <div className='mt-15'>
        <h2 className='text-xl my-3 font-medium'>What is Your Budget?</h2>
        <p className='text-gray-500 text-xl mt-2'>
          The budget is exclusively allocated for activities and dining purposes.
        </p>
        <div className='grid grid-cols-3 gap-5 mt-6'>
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("budget", item.title)}
              className={`${formData.budget === item.title ? "shadow-lg border border-black" : ""} col-span-3 sm:col-span-1 cursor-pointer rounded-lg hover:shadow-lg p-5`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-15'>
        <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-6'>
          {SelectTravelersList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("people", item.people)}
              className={`${formData.people === item.people ? "shadow-lg border border-black" : ""} col-span-3 sm:col-span-1 cursor-pointer rounded-lg hover:shadow-lg p-5`}
            >
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='text-sm text-gray-500'>{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='my-10 flex justify-end'>
        
        <Button disabled={loading} onClick={OnGenerateTrip}>
          { loading?<AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/> :"Generate Trip"}
          </Button>
        
      </div>
      <Dialog open={openDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle className='sr-only'>Sign In Dialog</DialogTitle> {/* for accessibility */}
      <div className="text-center">
        <img src="/logo.svg" alt="Logo" className="mx-auto" />
        <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
        <p className="text-muted-foreground text-sm">Sign in to the App with Google securely</p>
        <Button onClick={login} className="flex justify-center items-center gap-2 w-full mt-5">
          <FcGoogle className='h-5 w-5' />
          Sign In With Google
        </Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div> 
  );
};

export default CreateTrip;
