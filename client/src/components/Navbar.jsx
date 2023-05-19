import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import { CustomButton, ConnectButton, SwitchNetwork } from './';
import { logo, menu, search } from '../assets';
import { navlinks } from '../constants';
import './StyleSheets/ConnectButton.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState(false);
  const { address } = useStateContext();

  const [searchText, setSearchText] = useState('');
  

  const handleSearch = () => {
    if (searchText.trim() !== '') {
      navigate(`/user-campaigns/${searchText}`);
    }
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };


  return (
    <div className='flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6'>
      <div className='lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-window rounded-full shadow-primary'>

        <input type='text' 
          placeholder="Search for donation campaigns by owner's address" 
          className='flex w-full font-epilogue font-normal text-[14px]
            placeholder:text-placeholderText text-headerText bg-transparent outline-none'
          value={searchText}
          onChange={handleInputChange}
          />

        <div className='w-[40px] h-full rounded-[20px] bg-primaryColor flex justify-center items-center cursor-pointer'
          onClick={handleSearch}>
          <img src={search} alt='search' className='w-[15px] h-[15px] object-contain' />

        </div>

      </div>


      <div className='sm:flex hidden flex-row justify-end gap-4'>

      <SwitchNetwork/>

      {address && <CustomButton 
          btnType='button'
          title='Create Campaign'
          styles='bg-secondaryColor'
          handleClick={ () => {
            navigate('create-campaign')
          }}
          />
      }

      <ConnectButton/>
      

      </div>

      {/* SMALL SCREEN */}
      
      <div className='sm:hidden flex justify-between items-center relative'>
        <div  className="w-[40px] h-[40px] rounded-[10px] bg-iconBG flex justify-center items-center cursor-pointer ">
          <img src={logo} alt='user' className='w-[60%] object-conain' />
        </div>

        <img 
          src={menu}
          alt='menu'
          className='w-[34px] h-[34px] object-contain cursor-poiner'
          onClick={() => setToggleDrawer((toggleDrawer) => !toggleDrawer)}
        />

        <div className={`absolute top-[60px] right-0 left-0 bg-window z-10 shadow-secondary 
          py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
            <ul className='mb-4'>
              {navlinks.map((link) => (
                <li 
                  key={link.name}
                  className={`flex p-4 ${isActive === link.name && 'bg-insideWindow'}`}
                  onClick={() => {
                    setIsActive(link.name);
                    setToggleDrawer(false);
                    navigate(link.link);
                  }}
                >
                  <img src={link.imgUrl} alt={link.name}
                    className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : 'grayscale'}`}
                  />

                  <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-primaryColor' : 'text-paragraphText'}`}>
                    {link.name}
                  </p>

                </li>
              ))}
            </ul>

            <div className='flex mx-4 justify-center'>
              <SwitchNetwork/>

              {address && <CustomButton 
                  btnType='button'
                  title='Create campaign'
                  styles='bg-secondaryColor'
                  handleClick={ () => {
                    navigate('create-campaign')
                  }}
                  />
              }

              <ConnectButton/>

            </div>
        </div>
      </div>

    </div>
  )
}

export default Navbar 
