import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';

const UserCampaigns = () => {
    const params = useParams();
    const address = params.address;

    const [isLoading, setIsLoading] = useState(false);
    const [campaigns, setCampaigns] = useState([]);

    const { contract, getUserCampaigns } = useStateContext();

    const [render, setRender] = useState(false);

    useEffect(() => {
      if(contract) setRender(true);
    }, [contract]);
  

    const fetchCampaigns = async () => {
        setIsLoading(true);
        const data = await getUserCampaigns(address);
        setCampaigns(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if(contract) fetchCampaigns();
    }, [address, render]);

    return (
        <DisplayCampaigns 
        title={`User ${address} Campaigns`}
        isLoading={isLoading}
        campaigns={campaigns}
        />
    )
    }

    export default UserCampaigns