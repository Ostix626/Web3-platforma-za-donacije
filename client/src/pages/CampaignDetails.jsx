import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';


import { useStateContext } from '../context';
import { CountBox, CustomButton, Loader, VideoPlayer, PDFreader, UniSwap } from '../components';
import { calculateBarPercentage, daysLeft, isRealNumber, hashCode, strToTailwindGradient } from '../utils';


const CampaignDetails = () => {
  const params = useParams();
  const pId = params.id;

  const navigate = useNavigate();
  const { donate, getDonations, contract, address, getCampaign } = useStateContext();


  const [state, setState] = useState(useLocation().state);

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [donators, setDonators] = useState([]);

  useEffect(() => {
    if (contract && state === null) {
      fetchCampaign().then(data => {
        setState(data);
      });
    }
  }, [contract]);

  const fetchCampaign = async () => {
    return (await getCampaign(params.id));
  }


  const fetchDonators = async () => {
    const data = await getDonations(pId);

    setDonators(data);
  }

  useEffect(() => {
    if(contract) fetchDonators();
  }, [contract, address])

  const handleDonate = async () => {
    if(amount === "") {
      alert("Empty field");
      return;
    }
    if(!isRealNumber(amount)) {
      alert("Value is not correct");
      return;
    }

    try {
      setIsLoading(true);
      const feedback = await donate(pId, amount); 
      navigate('/')
    } catch (error) {
      // alert(`Transaction failed: ${error.message}`);
      console.error("Transaction failed: ", error.message);
    } finally {
      setIsLoading(false);
    }
  }


  if (!state) return <Loader text="Loading campaign"/>;

  if (state.owner === "0x0000000000000000000000000000000000000000") return (
    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-highlightText">
      This campaign does not exist.
    </p>
  )

  const remainingDays = daysLeft(state.deadline);
  const ownerColor = strToTailwindGradient(hashCode(state.owner));

  return (
    <div>
      {isLoading && <Loader text="Transaction is in progress"/>}

      <div className={`w-full flex md:flex-row flex-col mt-10 gap-[30px]`}>
        <div className="flex-1 flex-col">
          <img src={state.image} alt="campaign" className={`w-full h-[410px] object-cover rounded-xl shadow-secondary`}/>
          <div className={`relative w-full h-[20px] bg-statusBarBG mt-2 rounded-full text-center shadow-primary`}>
            <div className={`absolute h-full bg-statusBar rounded-full shadow-primary
              text-center text-xs font-medium text-highlightText p-0.5 `} 
              style={{ width: `${calculateBarPercentage(state.target, state.amountCollected)}%`, maxWidth: '100%'}}>
                {calculateBarPercentage(state.target, state.amountCollected)}%
            </div>
          </div>
        </div>

        <div className={`flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]`}>
          <CountBox title="Days Left" value={remainingDays} />
          <CountBox title={`Raised of ${state.target}`} value={Math.round(state.amountCollected * 100) / 100} />
          <CountBox title="Donations" value={donators.length} />
        </div>
      </div>

      <div className={`mt-[60px] flex lg:flex-row flex-col gap-5`}>
        <div className={`flex-[2] flex flex-col gap-[40px]`}>
          <div>
            <h4 className={`font-epilogue font-semibold text-[18px] text-headerText uppercase`}>Creator</h4>

            <div className={`mt-[20px] flex flex-row items-center flex-wrap gap-[14px]`}>
              <div className={`w-[52px] h-[52px] flex items-center justify-center rounded-full cursor-pointer`}>
                <div className={`w-[52px] h-[52px] rounded-full flex justify-center items-center bg-gradient-to-r ${ownerColor}`}></div>
              </div>
              <div>
              <Link to={`/user-campaigns/${state.owner}`} className={`font-epilogue hover:text-hoverLink font-semibold text-[14px] text-headerText break-all`}>
                  {state.name}
              </Link>
              <p></p>
                <Link to={`/user-campaigns/${state.owner}`} className={`mt-[4px] font-epilogue hover:text-hoverLink font-normal text-[12px] text-paragraphText`}>
                  {state.owner}
              </Link>
              </div>
            </div>
          </div>

          <div>
            <h4 className={`font-epilogue font-semibold text-[18px] text-headerText uppercase`}>Story</h4>

              <div className={`mt-[20px]`}>
                <pre className={`font-epilogue font-normal text-[16px] text-paragraphText leading-[26px] text-justify whitespace-pre-wrap`}>{state.description}</pre>
              </div>
          </div>

          {state.video != '' && 
          <div>
            <h4 className={`font-epilogue font-semibold text-[18px] text-headerText uppercase mb-[20px]`}>Video</h4>
            <VideoPlayer src={state.video}/>
              
          </div>
          }

          {state.pdf != '' && 
          <div>
            <PDFreader src={state.pdf}/>
          </div>
          } 

          <div>
            <h4 className={`font-epilogue font-semibold text-[18px] text-headerText uppercase`}>Donators</h4>
              <div className={`mt-[20px] flex flex-col gap-4`}>

              {donators.length > 0 ?

                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-12">
                    <div className="inline-block min-w-full sm:px-0 lg:pl-7">
                      <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light">
                          <thead>
                            <tr>
                              <th scope="col" className="px-6 py-4">#</th>
                              <th scope="col" className="px-6 py-4">Address</th>
                              <th scope="col" className="px-6 py-4">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {donators.map((item, index) => (
                              <tr key={index}>
                                <td className="whitespace-nowrap px-6 py-2 font-medium">{index + 1}.</td>
                                <td className="whitespace-nowrap px-6 py-2">{item.donator}</td>
                                <td className="whitespace-nowrap px-6 py-2">{item.donation} Matic</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                : (
                  <p className={`font-epilogue font-normal text-[16px] text-paragraphText leading-[26px] text-justify`}>No donators yet. Be the first one!</p>
                )}

              </div>
          </div>
        </div>

        <div className={`flex-1`}>
          {state.owner === address && 
          <div className={`mb-[30px]`}>
            <CustomButton 
              btnType="button"
              title="Edit Campaign"
              styles={`w-full bg-secondaryColor`}
              handleClick={() => {navigate(`/edit-campaign/${pId}`, { state: state })}}
            />
          </div>
          }
          <h2 className={`font-epilogue font-semibold text-[24px] text-headerText mb-[20px] pb-[10px] `}>{state.title}</h2>   


          <h4 className={`font-epilogue font-semibold text-[18px] text-headerText uppercase`}>Donate</h4>   

          <div className={`mt-[20px] flex flex-col p-4 bg-window rounded-[15px] shadow-secondary`}>
            <p className={`font-epilogue fount-medium text-[20px] leading-[30px] text-center text-paragraphText`}>
              Make a donation
            </p>
            <div className={`mt-[30px]`}>
              <input 
                type="number"
                placeholder="MATIC 0.1"
                step="0.01"
                min="0"
                className={`w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-inputBorder bg-transparent font-epilogue text-headerText text-[18px] leading-[30px] placeholder:text-placeholderText rounded-[10px]`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />

              <div className={`my-[20px] p-4 bg-insideWindow rounded-[10px]`}>

                <h4 className={`font-epilogue font-semibold text-[14px] leading-[22px] text-headerText`}>Bigger supporters will be rewarded with NFT for their donation.</h4>
                <div className="flex flex-col items-start">
                  <div className="mt-[20px] font-epilogue font-normal leading-[22px] text-paragraphText">
                    <span className="w-16 inline-block text-right mr-1">10$</span>
                    <span>= <a href="https://gateway.pinata.cloud/ipfs/QmXDgDMotUdyEQTZX8Korf45XBsYKKnNG64ZNheeuBBnCu//1.jpg" target="_blank" className="text-paragraphText hover:text-hoverLink">Bronze heart NFT reward</a></span>
                  </div>
                  <div className="mt-[20px] font-epilogue font-normal leading-[22px] text-paragraphText">
                    <span className="w-16 inline-block text-right mr-1">25$</span>
                    <span>= <a href="https://gateway.pinata.cloud/ipfs/QmXDgDMotUdyEQTZX8Korf45XBsYKKnNG64ZNheeuBBnCu//2.jpg" target="_blank" className="text-paragraphText hover:text-hoverLink">Silver heart NFT reward</a></span>
                  </div>
                  <div className="mt-[20px] font-epilogue font-normal leading-[22px] text-paragraphText">
                    <span className="w-16 inline-block text-right mr-1">50$</span>
                    <span>= <a href="https://gateway.pinata.cloud/ipfs/QmXDgDMotUdyEQTZX8Korf45XBsYKKnNG64ZNheeuBBnCu//3.jpg" target="_blank" className="text-paragraphText hover:text-hoverLink">Gold heart NFT reward</a></span>
                  </div>
                  <div className="mt-[20px] font-epilogue font-normal leading-[22px] text-paragraphText">
                    <span className="w-16 inline-block text-right mr-1">100$</span>
                    <span>= <a href="https://gateway.pinata.cloud/ipfs/QmXDgDMotUdyEQTZX8Korf45XBsYKKnNG64ZNheeuBBnCu//4.jpg" target="_blank" className="text-paragraphText hover:text-hoverLink">Emerald heart NFT reward</a></span>
                  </div>
                  <div className="mt-[20px] font-epilogue font-normal leading-[22px] text-paragraphText">
                    <span className="w-16 inline-block text-right mr-1">200$</span>
                    <span>= <a href="https://gateway.pinata.cloud/ipfs/QmXDgDMotUdyEQTZX8Korf45XBsYKKnNG64ZNheeuBBnCu//5.jpg" target="_blank" className="text-paragraphText hover:text-hoverLink">Platinum heart NFT reward</a></span>
                  </div>
                  <div className="mt-[20px] font-epilogue font-normal leading-[22px] text-paragraphText">
                    <span className="w-16 inline-block text-right mr-1">500$</span>
                    <span>= <a href="https://gateway.pinata.cloud/ipfs/QmXDgDMotUdyEQTZX8Korf45XBsYKKnNG64ZNheeuBBnCu//6.jpg" target="_blank" className="text-paragraphText hover:text-hoverLink">Royal heart NFT reward</a></span>
                  </div>
                </div>
              </div>

              <CustomButton 
                btnType="button"
                title="Donate to campaign"
                styles={`w-full bg-primaryColor`}
                handleClick={handleDonate}
              />
            </div>
          </div>

            <UniSwap/>          

        </div>
      </div>
    </div>
  )
}

export default CampaignDetails





