import React from 'react'
import { Web3Storage } from "web3.storage";
import { useState } from "react";
import { replaceWhiteSpace } from '../utils';

const client = new Web3Storage({ token: apiToken }); // ovdje staviti svoj api key od Web3.Storage

const UploadToIPFS = ({value, handleChange}) => {

    const [file, setFile] = useState(value);

    const handleUpload = async (e) => {
      e.preventDefault()
      var fileInput = document.getElementById("input");

      if(fileInput.files.length === 0 ) {
        alert("No input file");
        return;
      }
      
      console.error("changed file name", replaceWhiteSpace(fileInput.files[0].name))
      const rootCid = await client.put(fileInput.files, {
        // name: "PDFs",       //true => https://ipfs.io/ipfs/ + rootCid + / + fileInput.files[0].name
        // wrapWithDirectory: false, //false => https://ipfs.io/ipfs/ + rootCid 
        maxRetries: 3
      });
  
      setFile(rootCid) // https://ipfs.io/ipfs/ + rootCid + / + fileInput.files[0].name
      // const gatewayPDFlink = "https://ipfs.io/ipfs/" + rootCid + "/" + replaceWhiteSpace(fileInput.files[0].name);
      const w3PDFlink = "https://" + rootCid + ".ipfs.w3s.link/" + replaceWhiteSpace(fileInput.files[0].name);

      handleChange(w3PDFlink);
    };


  return (
    <div>
          <label className="flex-1 w-full flex flex-col">
            <span className="font-epilogue font-medium text-[14px] leading-[22px] text-paragraphText mb-[10px]">Upload PDF to IPFS</span>
          </label>
          <div className="flex">
            <input
              className="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border 
                border-solid border-inputBorder dark:border-inputBorder bg-clip-padding py-[0.32rem] 
                px-3 leading-[2.15] font-normal text-highlightText dark:text-highlightText transition duration-300 
                ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none 
                file:border-0 file:border-solid file:border-inherit file:bg-inputBorder dark:file:bg-inputBorder file:px-3 
                file:py-[0.32rem] file:text-neutral-700 dark:file:text-neutral-100 file:transition file:duration-150 
                file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-alertColor
                focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none"
              id="input"
              type="file" 
              name="file" 
              accept=".pdf"/>
    <button 
      className="relative m-0 block cursor-pointer rounded border 
        border-solid border-inputBorder dark:inputBorder bg-clip-padding py-[0.32rem] 
        px-3 leading-[2.15] font-normal text-headerText dark:headerText transition duration-300 
        ease-in-out file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit 
        file:bg-neutral-700 dark:file:bg-neutral-700 file:px-3 file:py-[0.32rem] file:text-neutral-100 
        dark:file:text-neutral-100 file:transition file:duration-150 file:ease-in-out 
        file:hover:bg-neutral-200 hover:bg-primaryColor focus:border-primary focus:text-neutral-700 
        hover:shadow-primary focus:outline-none ml-[30px] px-6"
      onClick={handleUpload}
    >
      Upload
    </button>
            </div>
            <p className="mt-1 text-sm text-placeholderText dark:placeholderText" id="file_input_help">
              Upload PDF file with more information about your donation campaign. <br/> 
              When the file is uploaded to IPFS, your CID (Contet ID) to the PDF file will be shown above.</p> 
    </div>
  )
}

export default UploadToIPFS

