import React from 'react';

import { daysLeft, hashCode, strToTailwindGradient } from '../utils';


const FundCard = ({ owner, title, description, target, deadline, amountCollected, image, handleClick }) => {
  
  const remainingDays = daysLeft(deadline);
  const ownerColor = strToTailwindGradient(hashCode(owner));
  
  return (
    <div className={`sm:w-[288px] w-full rounded-[15px] bg-window cursor-pointer shadow-secondary`} onClick={handleClick}>
      <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>

      <div className="flex flex-col p-4">

        <div className="block">
          <h3 className="font-epilogue font-semibold text-[16px] text-headerText text-left leading-[26px] truncate">{title}</h3>
          <p className="mt-[5px] font-epilogue font-normal text-paragraphText text-left leading-[18px] truncate">{description}</p>
        </div>

        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-highlightText leading-[22px]">{amountCollected} / {target} </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-paragraphText sm:max-w-[120px] truncate">Raised MATIC</p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] text-highlightText leading-[22px]">{remainingDays}</h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-paragraphText sm:max-w-[120px] truncate">Days Left</p>
          </div>
        </div>

        <div className="flex items-center mt-[20px] gap-[12px]">
          <div className="w-[30px] h-[30px] rounded-full flex justify-center items-center bg-insideWindow">
              <div className={`w-[30px] h-[30px] rounded-full flex justify-center items-center bg-gradient-to-r ${ownerColor}`}></div>
          </div>
          <p className="flex-1 font-epilogue font-normal text-[12px] text-paragraphText truncate">by <span className="text-highlightText">{owner}</span></p>
        </div>
      </div>
    </div>
  )
}

export default FundCard