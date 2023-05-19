import React from 'react'

const FormField = ({ labelName, placeholder, inputType, isTextArea, value, handleChange, step, required }) => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-paragraphText mb-[10px]">{labelName}</span>
      )}
      {isTextArea ? (
        <textarea 
          required={required}
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-inputBorder
            bg-transparent font-epilogue text-highlightText text-[14px] placeholder:text-placeholderText rounded-[10px] sm:min-w-[300px] lg:min-w-[600px]"
        />
      ) : (
        <input 
          required={required}
          value={value}
          onChange={handleChange}
          type={inputType}
          step={step}
          placeholder={placeholder}
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-inputBorder
            bg-transparent font-epilogue text-highlightText text-[14px] placeholder:text-placeholderText rounded-[10px] sm:min-w-[300px]"
        />
      )}
    </label>
  )
}

export default FormField