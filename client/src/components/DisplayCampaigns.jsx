import React from 'react';
import { useNavigate } from 'react-router-dom';

import FundCard from './FundCard';
import SmallLoader from './SmallLoader';

const DisplayCampaigns = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.pId}`, { state: campaign })
  }
  
  return (
    <div>
     
      <div className="flex flex-wrap mt-[20px] gap-[26px]">

        {isLoading && <SmallLoader text=" Loading campaigns..." isLoading={isLoading}/>}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-highlightText">
            There are no campigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
          key={campaign.pId}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns