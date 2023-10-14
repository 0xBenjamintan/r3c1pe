// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract Advertisement is Ownable {
    using ECDSA for bytes32;

    constructor(address initialOwner) Ownable(initialOwner) {}

    struct Ad {
        string description;
        int256 cpaOffer;
        bool active;
        string ipfsHash;
        uint256 creationTimestamp;
    }

    mapping(address => Ad) public ads;
    mapping(address => int256) public advertiserBalances;

    event AdUpdated(address indexed advertiser, string newDescription, int256 newCpaOffer);
    event CommissionPaid(address indexed referrer, int256 amount);
    event AdRegistered(address indexed advertiser, string description, int256 cpaOffer, string ipfsHash);
    event AdExpired(address indexed advertiser);

    function registerAd(string memory _description, int256 _cpaOffer,string memory _ipfsHash) external {
        _registerAd(msg.sender, _description, _cpaOffer * 1000,_ipfsHash);
    }

    function updateAd(string memory _newDescription, int256 _newCpaOffer) external {
        _updateAd(msg.sender, _newDescription, _newCpaOffer * 1000);
    }

    function withdrawFunds(int256 _amount) external {
        _withdrawFunds(msg.sender, _amount);
    }

    function payCommission(address _referrer, int256 _commission) external {
        _payCommission(msg.sender, _referrer, _commission);
    }

    function depositFunds() external payable {
        advertiserBalances[msg.sender] += int256(msg.value);
    }

    function toEthSignedMessageHash(bytes32 hash) internal pure returns (bytes32) {
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hash));
    }

    //for account abstraction EIP 4337 and EIP 2893
    function executeMetaTransaction(
        address user,
        uint256 value,
        bytes memory functionSignature,
        bytes32 r,
        bytes32 s,
        uint8 v
    ) public returns(bytes memory) {
        bytes32 hash = keccak256(abi.encodePacked(user, value, functionSignature, nonce[user]));
        nonce[user]++;
        
        bytes32 ethSignedMessageHash = toEthSignedMessageHash(hash);
        address signer = ethSignedMessageHash.recover(abi.encodePacked(r, s, v));
        require(signer == user, "Invalid signature");
        
        (bool success, bytes memory returnData) = address(this).delegatecall(abi.encodePacked(functionSignature, user));
        require(success, "Meta-transaction execution failed");
        
        return returnData;
    }

    mapping(address => uint256) public nonce;

    function _registerAd(
        address advertiser,
        string memory _description,
        int256 _cpaOffer,
        string memory _ipfsHash
    ) internal {
        require(bytes(_description).length > 0, "Description is required");
        require(_cpaOffer > 0, "CPA Offer must be greater than 0");
        require(bytes(_ipfsHash).length > 0, "IPFS hash is required");

        Ad memory newAd = Ad({
            description: _description,
            cpaOffer: _cpaOffer,
            active: true,
            ipfsHash: _ipfsHash,
            creationTimestamp: block.timestamp
        });

        ads[advertiser] = newAd;

        emit AdRegistered(advertiser, _description, _cpaOffer, _ipfsHash);
    }

    function _updateAd(address advertiser, string memory _newDescription, int256 _newCpaOffer) internal {
        require(bytes(_newDescription).length > 0, "New description is required");
        require(_newCpaOffer > 0, "New CPA Offer must be greater than 0");
        require(ads[advertiser].active, "Ad is not active");

        ads[advertiser].description = _newDescription;
        ads[advertiser].cpaOffer = _newCpaOffer;

        emit AdUpdated(advertiser, _newDescription, _newCpaOffer);
    }

    function _withdrawFunds(address advertiser, int256 _amount) internal {
        require(_amount <= advertiserBalances[advertiser], "Insufficient funds");

        advertiserBalances[advertiser] -= _amount;
        (bool success, ) = payable(advertiser).call{value: uint256(_amount)}("");
        require(success, "Transfer failed");
    }

    function _payCommission(address advertiser, address _referrer, int256 _commission) internal {
        require(ads[advertiser].active, "Ad is not active");
        require(_commission <= ads[advertiser].cpaOffer, "Commission exceeds CPA offer");
        require(advertiserBalances[advertiser] >= _commission, "Insufficient advertiser funds");

        advertiserBalances[advertiser] -= _commission;
        (bool success, ) = payable(_referrer).call{value: uint256(_commission)}("");
        require(success, "Transfer failed");

        emit CommissionPaid(_referrer, _commission);
    }

    function getAdDetails(address adOwner) external view returns (
        string memory description,
        int256 cpaOffer,
        bool active,
        string memory ipfsHash
    ) {
        Ad memory ad = ads[adOwner];
        return (ad.description, ad.cpaOffer / 1000, ad.active, ad.ipfsHash);
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
