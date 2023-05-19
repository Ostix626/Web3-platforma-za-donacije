// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DonorNFT is ERC721URIStorage, Ownable {
    address private CONTRACT_MINTER;
    string internal baseURIreward;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    mapping(address => uint256) public mintedWallets;

    constructor() ERC721("DonorNFT", "DONR") {
        CONTRACT_MINTER = address(0);
        baseURIreward = "ipfs://QmRcEHh4ndzemEZQgDD1Vny8SvTU23RVLYq6yZfh7prQxF/";
    }

    function setBaseURI(string calldata _newUri) public onlyOwner {
        baseURIreward = _newUri;
    }

    function setContractAddress(address _newContractAddress) public onlyOwner {
        CONTRACT_MINTER = _newContractAddress;
    }

    modifier onlyContract() {
        require(msg.sender == CONTRACT_MINTER, "Mint not allowed");
        _;
    } 

    function mintReward(address _to, string calldata _rewardTier) external onlyContract {
        uint256 tokenId = _tokenIdCounter.current();
        string memory fullRewardURI = string.concat(baseURIreward, _rewardTier, ".json");
        _mint(_to, tokenId);
        _setTokenURI(tokenId, fullRewardURI);
        _tokenIdCounter.increment();
        mintedWallets[_to]++;

    }

    function _baseURI() internal pure override returns (string memory) {
        return "";
    }
}



