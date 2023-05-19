import React, {useEffect} from 'react'
import {
  ChainId,
  useNetworkMismatch,
  useNetwork,
  useChainId,
  ConnectWallet,
  useAddress
} from "@thirdweb-dev/react";
import './StyleSheets/ConnectButton.css';

const ConnectButton = ({ btnType, title, handleClick, styles}) => {

  const address = useAddress(); 
  const [, switchNetwork] = useNetwork(); 
  const isMismatched = useNetworkMismatch(); // Detect if user is connected to the wrong network

  useEffect(() => {
    if (isMismatched) {
      switchNetwork(ChainId.Mumbai);
    }
  }, [address]); 

  return (
    <div 
        className='font-epilogue font-semibold text-[16px] leading-[26px] shadow-primary
        text-white min-h-[52px] rounded-[100px]'>
          <ConnectWallet 
          className='my-custom-class'
          colorMode="light" 
          accentColor="rgba(242, 123, 145, 0.75)"
          />

        </div>
  )
}

export default ConnectButton

