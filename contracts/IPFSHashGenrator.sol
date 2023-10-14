// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract IPFSHashGenerator {

    event HashGenerated(address indexed user, string ipfsHash);
    event HashStored(address indexed user, string ipfsHash);
    event HashVerified(address indexed user, string ipfsHash, bool isValid);

    mapping(address => string) public userHashes;
    mapping(string => bool) public hashRegistry;

    function generateHash(string memory data) public returns (string memory) {
        bytes32 hash = keccak256(abi.encodePacked(data));
        string memory ipfsHash = string(abi.encodePacked("Qm", hash));
        userHashes[msg.sender] = ipfsHash;
        emit HashGenerated(msg.sender, ipfsHash);
        return ipfsHash;
    }

    function storeHash(string memory ipfsHash) public {
        require(!hashRegistry[ipfsHash], "Hash already stored");
        userHashes[msg.sender] = ipfsHash;
        hashRegistry[ipfsHash] = true;
        emit HashStored(msg.sender, ipfsHash);
    }

    function verifyHash(string memory ipfsHash) public returns (bool) {  // Removed 'view' modifier
        bool isValid = hashRegistry[ipfsHash] && keccak256(abi.encodePacked(userHashes[msg.sender])) == keccak256(abi.encodePacked(ipfsHash));
        emit HashVerified(msg.sender, ipfsHash, isValid);
        return isValid;
    }

    function getHash(address user) public view returns (string memory) {
        return userHashes[user];
    }
}
