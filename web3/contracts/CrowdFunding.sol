// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IDonorNFT {
    function mintReward(address _to, string calldata _rewardTier) external;
}

contract CrowdFunding is Ownable {
    struct Campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
        uint256 campaignId;
        string pdf;
        string video;
        string name;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;
    uint256 public realNumberOfCampaigns = 0;

    address public rewardNFTcontract; 
    AggregatorV3Interface internal maticUsdPriceFeed = AggregatorV3Interface(0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada); // Mumbai testnet

    function setRewardNFTcontract(address _rewardNFTcontract) external onlyOwner {
        rewardNFTcontract = _rewardNFTcontract;
    }

     function getLatestPrice() public view returns (uint256) {
        (
            /* uint80 roundID */,
            int price,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = maticUsdPriceFeed.latestRoundData();
        return uint256(price);
    }

    function createCampaign(
        address _owner, 
        string memory _title, 
        string memory _description, 
        uint256 _target,
        uint256 _deadline,
        string memory _image,
        string memory _pdf,
        string memory _video,
        string memory _name
        ) public returns (uint256) {
            require(_deadline > block.timestamp, "Deadline in the past" );
            require(_target > 0, "Goal value must be greater than zero");
            Campaign storage campaign = campaigns[numberOfCampaigns];

            campaign.owner = _owner;
            campaign.title = _title;
            campaign.description = _description;
            campaign.target = _target;
            campaign.deadline = _deadline;
            campaign.amountCollected = 0;
            campaign.image = _image;
            campaign.campaignId = numberOfCampaigns;
            campaign.pdf = _pdf;
            campaign.video = _video;
            campaign.name = _name;

            numberOfCampaigns++;
            realNumberOfCampaigns++;

            return numberOfCampaigns - 1;
        }

    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        require(campaign.owner != address(0), "Donation failed. This campaign does not exist.");

        uint256 onePercent = amount / 100;
        uint256 remainingAmount = amount - onePercent;

        campaign.donators.push(msg.sender);
        campaign.donations.push(remainingAmount);
        campaign.amountCollected = campaign.amountCollected + remainingAmount;

        (bool sentToOwner,) = payable(owner()).call{value: onePercent}("");
        require(sentToOwner, "Failed to send 1% to contract owner");

        (bool sent,) = payable(campaign.owner).call{value: remainingAmount}("");
        require(sent, "Failed to send Matic");

        if(sent) {
            uint256 maticPriceInUSD = getLatestPrice();
            uint256 totalDonationValueInUSD = (msg.value * maticPriceInUSD) / 1e18;
            IDonorNFT NFTcontract = IDonorNFT(rewardNFTcontract);
            if (totalDonationValueInUSD > (500 * 1e8)) {  
                NFTcontract.mintReward(msg.sender, "6");
            } else if (totalDonationValueInUSD > (200 * 1e8)) {  
                NFTcontract.mintReward(msg.sender, "5");
            } else if (totalDonationValueInUSD > (100 * 1e8)) {  
                NFTcontract.mintReward(msg.sender, "4");
            } else if (totalDonationValueInUSD > (50 * 1e8)) {  
                NFTcontract.mintReward(msg.sender, "3");
            } else if (totalDonationValueInUSD > (25 * 1e8)) {
                NFTcontract.mintReward(msg.sender, "2");
            } else if (totalDonationValueInUSD > (10 * 1e8)) {
                NFTcontract.mintReward(msg.sender, "1");
            }
        }
    }

    function getDonators(uint256 _id) view public returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](realNumberOfCampaigns);

        uint j = 0;
        for(uint i = 0; i < numberOfCampaigns; i++) {
            if (campaigns[i].owner == address(0)) continue;

            Campaign storage item = campaigns[i];                           
            allCampaigns[j] = item;
            j++;
        }

        return allCampaigns;
    }

    function getCampaign(uint256 _id) view public returns (Campaign memory) {
        return campaigns[_id];
    }

    function modifyCampaign(
        uint256 _id,
        string memory _title, 
        string memory _description, 
        uint256 _target,
        uint256 _deadline,
        string memory _image,
        string memory _pdf,
        string memory _video,
        string memory _name
    ) public {

        if(msg.sender != campaigns[_id].owner) {
            revert("Can't be modified. You are not the owner.");
        }
        require(_deadline > block.timestamp, "Deadline in the past instead of future" );
        require(_target > 0, "Goal value must be greater than zero");

        campaigns[_id].title = _title;
        campaigns[_id].description = _description;
        campaigns[_id].target = _target;
        campaigns[_id].deadline = _deadline;
        campaigns[_id].image = _image;
        campaigns[_id].pdf = _pdf;
        campaigns[_id].video = _video;
        campaigns[_id].name = _name;
    }

    function deleteCampaign(uint256 _id) public {

        if(msg.sender != campaigns[_id].owner) {
            revert("Can't be deleted. You are not the owner of this.");
        }

        delete campaigns[_id];
        realNumberOfCampaigns--;
    }
    
}