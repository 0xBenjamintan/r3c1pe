// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract AdIndex {
    // Struct to hold ad information including IPFS hash
    struct AdInfo {
        address adContract;
        string ipfsHash;
    }

    // Array to store ad information
    AdInfo[] private ads;

    // Events
    event AdIndexed(address indexed adContract, string ipfsHash);
    event AdRemoved(address indexed adContract);

    // Function to index a new ad along with its IPFS hash
    function indexAd(address adContract, string memory ipfsHash) external {
        require(adContract != address(0), "Invalid address");
        require(bytes(ipfsHash).length > 0, "IPFS hash is required");

        ads.push(AdInfo({
            adContract: adContract,
            ipfsHash: ipfsHash
        }));

        emit AdIndexed(adContract, ipfsHash);
    }

    // Function to remove an ad from the index
    function removeAd(address adContract) external {
        require(adContract != address(0), "Invalid address");
        
        uint index = findAdIndex(adContract);
        require(index < ads.length, "Ad contract not found");

        // Swap the ad to remove with the last ad in the array, then remove the last ad
        ads[index] = ads[ads.length - 1];
        ads.pop();

        emit AdRemoved(adContract);
    }

    // Helper function to find the index of an ad in the ads array
    function findAdIndex(address adContract) internal view returns (uint) {
        for (uint i = 0; i < ads.length; i++) {
            if (ads[i].adContract == adContract) {
                return i;
            }
        }
        revert("Ad contract not found");
    }

    // Function to search and return all ads along with their IPFS hashes
    function searchAds() external view returns (AdInfo[] memory) {
        // Returning all ads for simplicity, add filtering logic based on your criteria
        return ads;
    }
}
