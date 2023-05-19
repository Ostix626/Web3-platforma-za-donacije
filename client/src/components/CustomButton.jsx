import React from 'react'

const CustomButton = ({ btnType, title, handleClick, styles}) => {
  return (
    <button
      type={btnType}
      className={`font-epilogue font-semibold text-[16px] leading-[26px] shadow-primary
        text-white min-h-[52px] px-4 rounded-[100px] ${styles}`}
      onClick={handleClick}
    >
        {title}
    </button>
  )
}

export default CustomButton