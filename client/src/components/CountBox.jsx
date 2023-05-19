import React from 'react'

const CountBox = ({ title, value }) => {
  return (
    <div className="flex flex-col items-center w-[150px] rounded-[20px] shadow-primary">
      <h6 className="font-epilogue font-normal text-[16px] text-paragraphText bg-primaryColor px-3 py-2 w-full rounded-t-[20px] text-center">{title}</h6>
    
      <h4 className="font-epilogue font-bold text-[30px] text-headerText p-5 bg-window rounded-b-[20px] w-full text-center truncate">{value}</h4>
    </div>
  )
}

export default CountBox
