import React from 'react'

import { loader } from '../assets';
import Fluid from './Fluid.jsx';

const Loader = ({text}) => {
  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <img src={loader} alt="loader" className="w-[110px] h-[110px] object-contain"/>
      <p className="mt-[5px] font-epilogue font-bold text-[20px] text-white text-center">{text} <br /> Please wait...</p>
      <Fluid/>
    </div>
  )
}

export default Loader