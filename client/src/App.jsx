import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom';

import {
  CampaignDetails, 
  Home,
  Profile, 
  CreateCampaign,
  EditCampaign,
  UserCampaigns
} from './pages';

import {
  Navbar, 
  Sidebar,
  Background
} from './components';

const App = () => {
  const [backgroundTheme, setBackgroundTheme] = useState(0);
  const changeTheme = () => {
    setBackgroundTheme((backgroundTheme + 1) % 6);
  }


  return (
    <Background theme={backgroundTheme}>
      <div className="realtive sm:-8 p-4 
      bg-transparent
      min-h-screen flex flex-row">

        <div className='sm:flex hidden mr-10 relative'>
          <Sidebar changeTheme={changeTheme}/>
        </div>

        <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
          <Navbar/>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-campaign" element={<CreateCampaign />} />
            <Route path="/campaign-details/:id" element={<CampaignDetails />} />
            <Route path="/edit-campaign/:id" element={<EditCampaign />} />
            <Route path="/user-campaigns/:address" element={<UserCampaigns />} />
          </Routes>
        </div>
      </div>
    </Background>
  )
}

export default App