import React, { useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { CustomButton, FormField, Loader, UploadToIPFS } from '../components';
import { checkIfImage } from '../utils';



const EditCampaign = () => {

  const navigate = useNavigate();
  const { state } = useLocation();
  
  const params = useParams();
  const pId = params.id;
  const [isLoading, setIsLoading] = useState (false);
  const { deleteCampaign, modifyCampaign, address } = useStateContext();
  const [form, setForm] = useState({
    name: state.name,
    title: state.title,
    description: state.description,
    target: state.target,
    deadline: new Date(state.deadline).toISOString().substr(0, 10),
    image: state.image,
    pdf: state.pdf,
    video: state.video,
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const setIpfsUploadCID = (link) => {
    setForm({ ...form, pdf: link })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(typeof address === "undefined"){
      alert("Connet your wallet first.")
      return;
    }

    checkIfImage(form.image, async (exists) => {
      if(exists) {

        try {
          setIsLoading(true);
          const feedback = await modifyCampaign(pId, { ...form, target: ethers.utils.parseUnits(form.target, 18)});
          navigate('/')
        } catch (error) {
          // alert(`Transaction failed: ${error.message}`);
          console.error("Transaction failed: ", error.message);
        } finally {
          setIsLoading(false);
        }
      } else {
        alert('Provide valid image URL');
        setForm({ ...form, image: ''});
      }
    })
  }

  const handleDelete = async (e) => {
    e.preventDefault();

      try {
        setIsLoading(true);
        const feedback = await deleteCampaign(pId);
        navigate('/')
      } catch (error) {
        // alert(`Transaction failed: ${error.message}`);
        console.error("Transaction failed: ", error.message);
      } finally {
        setIsLoading(false);
      }

    }

  return (
    <div className='bg-window flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 '>
      {isLoading && <Loader text="Transaction in progress"/>}
      <div className='flex justify-center items-center p-[16px] sm:min-w-[380px] bg-insideWindow rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-headerText'>Edit Campaign</h1>
      </div>

      <form onSubmit={handleSubmit}
        className='w-full mt-[65px] flex flex-col gap-[30px]'>

       
        
        <div className='flex flex-wrap gap-[40px]'>
          <FormField 
            labelName='Your Name * '
            placeholder='Name Surname'
            inputType='text'
            required={true}
            value={form.name}
            handleChange={(e) => handleFormFieldChange('name', e)}
          />

          <FormField 
            labelName='Campaign Title * '
            placeholder='Your campaign title'
            inputType='text'
            required={true}
            value={form.title}
            handleChange={(e) => handleFormFieldChange('title', e)}
          />
        </div>


        <div className='flex flex-wrap gap-[40px]'>
          <FormField 
            labelName='Story * '
            placeholder='Write your story, external links, contact information...'
            isTextArea
            required={true}
            value={form.description}
            handleChange={(e) => handleFormFieldChange('description', e)}
          />

        </div>

        <FormField 
            labelName='Campaign cover image * '
            placeholder='Place URL of your campaign image'
            inputType='url'
            required={true}
            value={form.image}
            handleChange={(e) => handleFormFieldChange('image', e)}
        /> 

        <div className="mt-2 flex flex-col  gap-[20px] justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">

          <FormField 
            labelName='PDF with information'
            placeholder='URL to the PDF file'
            inputType='text'
            value={form.pdf}
            handleChange={(e) => handleFormFieldChange('pdf', e)}
          />

          <UploadToIPFS
            value={form.pdf}
            handleChange={setIpfsUploadCID}
          />

        </div>

        <FormField 
            labelName='Video'
            placeholder='URL to the video'
            inputType='text'
            value={form.video}
            handleChange={(e) => handleFormFieldChange('video', e)}
          />

        <div className='flex flex-wrap gap-[40px]'>
          <FormField 
            labelName='Goal * '
            placeholder='0.2 MATIC'
            inputType='number'
            step='0.01'
            min="0"
            required={true}
            value={form.target}
            handleChange={(e) => {
                if(Number(e.target.value) <= 0) {
                  e.target.value = '';
                }
                handleFormFieldChange('target', e)
              }
            }
          />

          <FormField 
            labelName='End Date * '
            placeholder='Chose end date'
            inputType='date'
            required={true}
            value={form.deadline}
            handleChange={(e) => handleFormFieldChange('deadline', e)}
          />
        </div>

        <div className='flex justify-center items-center'>
            <CustomButton
              btnType='submit'
              title='Update campaign'
              styles='bg-secondaryColor'
            />
        </div>
      </form>
      <div className='flex justify-center items-center mt-[30px]'>
            <CustomButton
              btnType='Button'
              title='Delete campaign'
              styles='bg-alertColor'
              handleClick={handleDelete}
            />
        </div>
    </div>
  )
}

export default EditCampaign

