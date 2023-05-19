import React from 'react';
import { useNetworkMismatch, useNetwork, ChainId } from "@thirdweb-dev/react";

import {CustomButton} from './';


const SwitchNetwork = () => {
    const isMismatched = useNetworkMismatch();
    const [, switchNetwork] = useNetwork();
  
    return (
      <div>
        {isMismatched && (

          <CustomButton   
            btnType='button'
            title='Switch Network'
            styles='bg-alertColor'
            handleClick={() => switchNetwork(ChainId.Mumbai)}
          />
        )}
      </div>
    );
  };

export default SwitchNetwork;
