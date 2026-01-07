import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';

const Header = () => {

  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    // console.log(user);
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error)
  })

  const GetUserProfile = async (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: "Application/json"
      }
    }).then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    })
  }



  return (
    <div className='p-2 px-20 shadow-sm flex justify-between items-center'>
      <img width={150} src="/Logo.png" alt="" />
      <div>
        {user ?
          <div className='flex gap-4 items-center'>
            <a href="/create-trip">
              <Button variant="outline" className="rounded-full cursor-pointer">Create Trip</Button>
            </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full cursor-pointer">My Trip</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user.picture} className='w-[40px] h-[40px] rounded-full cursor-pointer' alt='user profile...' />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className='cursor-pointer' onClick={() => {
                  googleLogout();
                  localStorage.clear();
                  window.location.href = "/"; // Redirect to home page after logout
                }}>Logout</h2>
              </PopoverContent>
            </Popover>

          </div>
          : <Button className="cursor-pointer" onClick={() => setOpenDialog(true)}>Sign In</Button>
        }

      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
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

export default Header