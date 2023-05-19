import React, { useContext, createContext } from "react";
import { useAddress, useContract, useMetamask, useContractWrite, useDisconnect } from '@thirdweb-dev/react';
import { ethers } from 'ethers';
import { Mumbai } from "@thirdweb-dev/chains";


const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const { contract } = useContract('0x33C2D3A7840021B0bfA9c8F1e020174bD21E75D7'); // smart contract address
    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign');

    const address = useAddress();
    const connect = useMetamask({chainId: Mumbai.chainId});
    const disconnect = useDisconnect();

    const publishCampaign = async (form) => {

        try {
            const data = await createCampaign([
                address, //owner
                form.title, 
                form.description,
                form.target,
                new Date(form.deadline).getTime() / 1000, //block.time je u sekundama, a js vraca u milisekundama
                form.image,
                form.pdf,
                form.video,
                form.name
            ])
            
        } catch (error) {
            console.error("contract call failed -> ", error);
        }
    }

    const getCampaigns = async () => {
        const campaigns = await contract.call('getCampaigns');

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber() * 1000,  // u sc je spremljeno u sekundama, a u js trebaju ms
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: campaign.campaignId,
            pdf: campaign.pdf,
            video: campaign.video,
            name: campaign.name
        })).reverse();

        return parsedCampaigns;
    }

    const getUserCampaigns = async (userAddress) => {
        const allCampaigns = await getCampaigns()

        if(typeof userAddress === 'undefined'){
            const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);
            return filteredCampaigns;
        }
        else {
            const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === userAddress);
            return filteredCampaigns;
        }
    }

    const donate = async (pId, amount) => {
        const data = await contract.call('donateToCampaign', pId, {value: ethers.utils.parseEther(amount)});
        return data;
    }

    const getDonations = async (pId) => {
        const donations = await contract.call('getDonators', pId);
        const numberOfDonations = donations[0].length;

        const parseDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parseDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString())
            })
        }

        return parseDonations;
    }

    const getCampaign = async (pId) => {
        const campaign = await contract.call('getCampaign', pId);
        
        const parsedCampaign = {
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber() * 1000,  // u sc je spremljeno u sekundama, a u js nam trebaju ms
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pId: campaign.campaignId,
            pdf: campaign.pdf,
            video: campaign.video,
            name: campaign.name
        };

        return parsedCampaign;
    }

    const deleteCampaign = async (_id) => {
        const data = await contract.call("deleteCampaign", _id);
        return data;
    }

    const modifyCampaign = async (_id, form) => {
        try {
            const data = await contract.call("modifyCampaign", 
            _id, 
            form.title, 
            form.description, 
            form.target, 
            new Date(form.deadline).getTime() / 1000, 
            form.image,
            form.pdf,
            form.video,
            form.name
            )
            
        } catch (error) {
            console.error("contract call modifyCampaign failed -> ", error);
        }
    }

    return (
        <StateContext.Provider
            value={{ 
                address,
                contract, 
                connect,
                disconnect,
                createCampaign: publishCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                getCampaign,
                deleteCampaign,
                modifyCampaign,
            }}
        >
            {children}
        </StateContext.Provider>
    )
}


export const useStateContext = () => useContext(StateContext);

