import React from 'react'

import { loader } from '../assets';

const SmallLoader = ({text, isLoading}) => {
  return (
    <div>
    {isLoading && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={loader} alt="loader" className="w-[150px] h-[150px]" />
        <h4 className="font-epilogue font-semibold text-[18px] text-headerText">{text}</h4>
        </div>
    )}
    </div>
  )
}

export default SmallLoader