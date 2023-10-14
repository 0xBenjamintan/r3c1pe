// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Advertisement is Ownable {
    using ECDSA for bytes32;

    constructor(address initialOwner) Ownable(initialOwner) {}

    struct Ad {
        string description;
        uint256 cpaOffer;
        bool active;
        string ipfsHash;  // Add this line to store the IPFS hash
        uint256 creationTimestamp;
    }


    mapping(address => Ad) public ads;
    mapping(address => uint256) public advertiserBalances;

    //event AdRegistered(address indexed advertiser, string description, uint256 cpaOffer);
    event AdUpdated(address indexed advertiser, string newDescription, uint256 newCpaOffer);
    event CommissionPaid(address indexed referrer, uint256 amount);

    event AdRegistered(
        address indexed advertiser,
        string description,
        uint256 cpaOffer,
        string ipfsHash  // Event parameter to log the IPFS hash
    );
    event AdExpired(address indexed advertiser); //event added for add expiry


    function registerAd(string memory _description, uint256 _cpaOffer,string memory _ipfsHash) external {
        _registerAd(msg.sender, _description, _cpaOffer,_ipfsHash);
    }

    function updateAd(string memory _newDescription, uint256 _newCpaOffer) external {
        _updateAd(msg.sender, _newDescription, _newCpaOffer);
    }

    function withdrawFunds(uint256 _amount) external {
        _withdrawFunds(msg.sender, _amount);
    }

    function payCommission(address _referrer, uint256 _commission) external {
        _payCommission(msg.sender, _referrer, _commission);
    }

    function depositFunds() external payable {
        advertiserBalances[msg.sender] += msg.value;
    }

    function toEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32) {
            // 32 is the length of the message to hash, change it as required
            return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
        }

    function executeMetaTransaction(
        address user,
        uint256 value,
        bytes memory functionSignature,
        bytes32 r,
        bytes32 s,
        uint8 v
    ) public returns(bytes memory) {
        // Construct the meta-transaction message
        bytes32 hash = keccak256(abi.encodePacked(user, value, functionSignature, nonce[user]));
        nonce[user]++;
        
        // Verify the user's signature
        bytes32 ethSignedMessageHash = toEthSignedMessageHash(hash);
        address signer = ethSignedMessageHash.recover(abi.encodePacked(r, s, v));
        require(signer == user, "Invalid signature");
        
        // Call the function
        (bool success, bytes memory returnData) = address(this).delegatecall(abi.encodePacked(functionSignature, user));
        require(success, "Meta-transaction execution failed");
        
        return returnData;
    }

    mapping(address => uint256) public nonce;  // Nonce for each user to ensure unique meta-transactions

    // Internal functions to handle meta-transaction execution
    // function _registerAd(address advertiser, string memory _description, uint256 _cpaOffer) internal {
    //     require(bytes(_description).length > 0, "Description is required");
    //     require(_cpaOffer > 0, "CPA Offer must be greater than 0");

    //     Ad memory newAd = Ad({
    //         description: _description,
    //         cpaOffer: _cpaOffer,
    //         active: true
    //     });

    //     ads[advertiser] = newAd;

    //     emit AdRegistered(advertiser, _description, _cpaOffer);
    // }

    //ipfs implemented
 function _registerAd(
        address advertiser,
        string memory _description,
        uint256 _cpaOffer,
        string memory _ipfsHash  // Parameter to accept the IPFS hash
    )
        internal
    {
        require(bytes(_description).length > 0, "Description is required");
        require(_cpaOffer > 0, "CPA Offer must be greater than 0");
        require(bytes(_ipfsHash).length > 0, "IPFS hash is required");  // Ensure the IPFS hash is provided

        Ad memory newAd = Ad({
            description: _description,
            cpaOffer: _cpaOffer,
            active: true,
            ipfsHash: _ipfsHash,  // Store the IPFS hash here
            creationTimestamp: block.timestamp  // Record the current time
        });

        ads[advertiser] = newAd;

        emit AdRegistered(advertiser, _description, _cpaOffer, _ipfsHash);  // Log the IPFS hash
    }


    function _updateAd(address advertiser, string memory _newDescription, uint256 _newCpaOffer) internal {
        require(bytes(_newDescription).length > 0, "New description is required");
        require(_newCpaOffer > 0, "New CPA Offer must be greater than 0");
        require(ads[advertiser].active, "Ad is not active");

        ads[advertiser].description = _newDescription;
        ads[advertiser].cpaOffer = _newCpaOffer;

        emit AdUpdated(advertiser, _newDescription, _newCpaOffer);
    }

    function _withdrawFunds(address advertiser, uint256 _amount) internal {
        require(_amount <= advertiserBalances[advertiser], "Insufficient funds");

        advertiserBalances[advertiser] -= _amount;
        (bool success, ) = payable(advertiser).call{value: _amount}("");
        require(success, "Transfer failed");
    }

    function _payCommission(address advertiser, address _referrer, uint256 _commission) internal {
        require(ads[advertiser].active, "Ad is not active");
        require(_commission <= ads[advertiser].cpaOffer, "Commission exceeds CPA offer");
        require(advertiserBalances[advertiser] >= _commission, "Insufficient advertiser funds");

        advertiserBalances[advertiser] -= _commission;
        (bool success, ) = payable(_referrer).call{value: _commission}("");
        require(success, "Transfer failed");

        emit CommissionPaid(_referrer, _commission);
    }

    // function getAdDetails(address adOwner) external view returns (string memory, uint256, bool) {
    //     Ad memory ad = ads[adOwner];
    //     return (ad.description, ad.cpaOffer, ad.active);
    // }

    function getAdDetails(address adOwner) external view returns (string memory description, uint256 cpaOffer, bool active, string memory ipfsHash) {
        Ad memory ad = ads[adOwner];
        return (ad.description, ad.cpaOffer, ad.active, ad.ipfsHash);  // now returns ipfsHash as well
    }

    function checkAdExpiry(address advertiser) public {
        Ad storage ad = ads[advertiser];
        require(ad.creationTimestamp > 0, "Ad does not exist");
        if (block.timestamp >= ad.creationTimestamp + 30 days) {
            ad.active = false;
            emit AdExpired(advertiser);
        }
    }
}
