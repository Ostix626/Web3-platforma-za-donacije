import React, { useState, useEffect } from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';
import { daysLeft } from '../utils';

const Tab = ({styles, title, imgUrl, isActive, disabled, handleClick}) => (
  <div className={`flex w-[120px] h-[36px] rounded-[40px] font-epilogue pt-[2px] shadow-primary bg-window hover:bg-secondaryColor
    ${isActive && 'bg-primaryColorTransparent shadow-primary text-white'} 
    flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} 
    onClick={handleClick}>
    <h1>{title}</h1>
  </div>
)


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);
  const [isActive, setIsActive] = useState('Everything');
  const [title, setTitle] = useState('All Campaigns');
  const [showCampaigns, setShowCampaigns] = useState([]);

  const { address, contract, getCampaigns } = useStateContext();

  const [render, setRender] = useState(false);

  useEffect(() => {
    if(contract) setRender(true);
  }, [contract]);

  
  const fetchCampaigns = async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setShowCampaigns(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchCampaigns();
  }, [address, render]);

  const handleClick = (title) => {
      setIsActive(title);

      switch (title) {
        case 'Everything':
          setShowCampaigns(campaigns);
          setTitle('All Campaigns')
          break;

        case 'Ongoing':
            const ongoingCampaigns = campaigns.filter((campaign) => {
              return campaign.amountCollected < campaign.target && daysLeft(campaign.deadline) >= 0;
            });
    
          setShowCampaigns(ongoingCampaigns);
          setTitle('Ongoing Campaigns')
          break;

        case 'Finished':
            const finishedCampaigns = campaigns.filter((campaign) => {
              return campaign.amountCollected > campaign.target || daysLeft(campaign.deadline) < 0;
            });
    
          setShowCampaigns(finishedCampaigns);
          setTitle('Finished Campaigns')
          break;

        default:
          setShowCampaigns(campaigns);
          setTitle('All Campaigns')
      }

  }
    

  return (
    <>
    
    <div className="flex md:flex-row flex-col-reverse mb-[35px] gap-6 justify-between">
      <h1 className="font-epilogue font-semibold text-[18px] text-headerText text-left flex items-center pt-[4px]">{title} ({showCampaigns.length})</h1>
      <div className="flex gap-6">
        <Tab title={"Everything"} isActive={"Everything" === isActive} handleClick={() => handleClick("Everything")}/>
        <Tab title={"Ongoing"} isActive={"Ongoing" === isActive} handleClick={() => handleClick("Ongoing")}/>
        <Tab title={"Finished"} isActive={"Finished" === isActive} handleClick={() => handleClick("Finished")}/>
      </div>
    </div>

    <DisplayCampaigns 
      isLoading={isLoading}
      campaigns={showCampaigns}
    />
    </>
  )
}

export default Home