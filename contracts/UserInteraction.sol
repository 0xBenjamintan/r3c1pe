// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Advertisements.sol";

contract UserInteraction {
    Advertisement private adContract;

    event AdInteraction(address indexed adOwner, address indexed user, string ipfsHash);

    constructor(address _adContract) {
        adContract = Advertisement(_adContract);
    }

    function interact(address adOwner) public {
        (string memory description, uint256 cpaOffer, bool active, string memory ipfsHash) = adContract.getAdDetails(adOwner);
        require(active, "Ad is not active");
        emit AdInteraction(adOwner, msg.sender, ipfsHash);
        // Additional interaction logic here
    }

    function getAdContentHash(address adOwner) public view returns (string memory) {
        (, , , string memory ipfsHash) = adContract.getAdDetails(adOwner);
        return ipfsHash;
    }

    function verifyAdContentHash(address adOwner, string memory ipfsHash) public view returns (bool) {
        string memory storedHash = getAdContentHash(adOwner);
        return keccak256(abi.encodePacked(ipfsHash)) == keccak256(abi.encodePacked(storedHash));
    }

    function getAd(address adOwner) public view returns (string memory description, uint256 cpaOffer, bool active, string memory ipfsHash) {
        (description, cpaOffer, active, ipfsHash) = adContract.getAdDetails(adOwner);
    }

    //will be uncommented when function added to Advertisements.sol
    // function updateAdContent(address adOwner, string memory newIpfsHash) external {
    //     adContract.updateAdIpfsHash(adOwner, newIpfsHash);
    //     // Additional logic if necessary
    // }

    // This function would be called by the front-end to fetch the content from IPFS
    // This is a simplified example and would be handled off-chain
    // function fetchAdContent(string memory ipfsHash) public view returns (bytes memory content) {
    //     // Fetch content from IPFS
    //     // content = IPFS.getContent(ipfsHash);
    // }
}
