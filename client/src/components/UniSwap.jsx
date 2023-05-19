import React from 'react';
import { SwapWidget } from '@uniswap/widgets';

const RPC = "https://matic-mumbai.chainstacklabs.com"; // replace with mainet 


const UniSwap = () => {
  return (
    <>
    <div className="Uniswap shadow-secondary rounded-[15px] mt-[26px]">
        <SwapWidget 
            jsonRpcEndpoint={RPC}
            theme={theme}
            width="100%"
        />
    </div>
    </>
  )
}

export default UniSwap


const theme = {
    interactive: '#fbfbfd',
    container: 'rgba(241, 241, 247, 0.75)',
    accent: 'rgba(242, 123, 145, 0.75)',
    fontFamily: 'Epilogue',
  }