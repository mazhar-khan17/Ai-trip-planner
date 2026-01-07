import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '@/constants/Options'
import { chatSession } from '@/service/AIModal'
import React, { useEffect, useState } from 'react'
// import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { toast } from 'sonner'
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/service/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'



const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [formdata, setFormdata] = useState([]);
  const [day, setDay] = useState();
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormdata({
      ...formdata,
      [name]: value,
    })
  }

  useEffect(() => {
  }, [formdata]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const onGenerateTrip = async () => {

    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDailog(true)
      return;
    }

    // Validate fields are not undefined, null or empty string
    if (
      !formdata?.location || formdata.location.trim() === "" ||
      !formdata?.day || formdata.day.toString().trim() === "" ||
      !formdata?.budget || !formdata?.traveler
    ) {
      toast("Please fill all details!")
      return
    }

    if (parseInt(formdata.day) < 1) {
      toast("Trip must be at least 1 day!")
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formdata?.location)
      .replace('{totalDays}', formdata?.day)
      .replace('{traveler}', formdata?.traveler)
      .replace('{budget}', formdata?.budget)
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      setLoading(false);
      SaveAiTrip(result?.response?.text())
      toast("Trip Generated Successfully! 🎉")
    } catch (err) {
      console.error("Gemini API Error Please check:", err);
      toast("Error talking to Gemini API.");
    }
  }

  const SaveAiTrip = async (TripData) => {
    setLoading(true)
    // Add a new document in collection "cities"
    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formdata,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });
    setLoading(false)
    navigate('/view-trip/' + docId)
  };

  const GetUserProfile = async (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "Application/json"
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDailog(false);
      onGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-8'>
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️🌴</h2>
      <p className='mt-8 text-grey-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

      <div className='mt-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          {/* <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v), handleInputChange('location', v) },
              placeholder: "Search for a place",
            }}
          /> */}

          <Input
            className='mt-3'
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Enter a place"
            type="text"
          />
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='text-xl my-3 font-medium'>How many days are you planning?</h2>
        <Input className='mt-3' onChange={(e) => handleInputChange('day', e.target.value)} placeholder="Ex.3" type="number" />
      </div>

      <div className='mt-10'>
        <h2 className='text-xl mt-5 my-3 font-medium'>What is your Budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectBudgetOptions.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formdata?.budget == item.title && 'shadow-lg border-black'}`}>
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg mt-2">{item.title}</h2>
              <h2 className=" text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className='mt-10'>
        <h2 className='text-xl mt-5 my-3 font-medium'>Who do you plan on traveling with on your next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectTravelesList.map((item, index) => (
            <div key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg ${formdata?.traveler == item.people && 'shadow-lg border-black'}`}>
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg mt-2">{item.title}</h2>
              <h2 className=" text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>


      <div className='my-10 justify-end flex'>
        <Button
          disabled={loading}
          onClick={onGenerateTrip} className={"hover:cursor-pointer"}>
          {loading ?
            <AiOutlineLoading3Quarters className='w-7 h-7 animate-spin' /> : " Generate Trip"}
        </Button>
      </div>

      <Dialog open={openDailog}>
        <DialogContent onClick={() => setOpenDailog(false)}>
          <DialogHeader>
            <DialogDescription>
              <img width={150} src='/Logo.png' alt='logo...' />
              <h2 className='font-bold text-lg mt-2'>Sign In With Google</h2>
              <p>Sign in to the app with google authentication securely</p>

              <Button
                onClick={login}
                className="w-full mt-5 hover:cursor-pointer flex gap-2 items-center ">
                <FcGoogle className='h-7 w-7' />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip   