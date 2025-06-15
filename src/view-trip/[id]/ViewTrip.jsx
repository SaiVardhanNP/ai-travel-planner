import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import { db } from '../../service/firebaseConfig';
import Information from '../components/Information';
import { Hotel } from 'lucide-react';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';

const ViewTrip = () => {

    const {id}=useParams();
    const [trip,setTrip]=useState([]);

    useEffect(()=>{
        id && getTripData();
    },[id])
    const getTripData=async ()=>{
        const docRef=doc(db,"AITrips",id);
        const docSnap=await getDoc(docRef);
        console.log(docSnap);

        if(docSnap.exists()){
          console.log("HI")
                console.log("Document",docSnap.data())
                setTrip(docSnap.data());
        }
        else{
            console.log("No such document");
            toast("No trip found!")
        }
    }
  return (
    <div className='px-8 md:px-20 lg:px-44 xl:px-56'>
      <Information trip={trip}/>

      <Hotels trip={trip }/>


      <PlacesToVisit trip={trip}/>

      <Footer trip={trip}/>


    </div>
  )
}

export default ViewTrip
