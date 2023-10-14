// SPDX-License-Identifier: MIT

//Implementation of EIP 
pragma solidity ^0.8.20;

contract AccountContract {
    address public owner;

    event TransactionExecuted(address to, uint256 value, bytes data);

    constructor(address _owner) {
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the contract owner");
        _;
    }

    function executeTransaction(
        address to,
        uint256 value,
        bytes memory data,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public onlyOwner returns (bool success) {
        // Ensure the transaction has been signed by the owner
        bytes32 hash = keccak256(abi.encodePacked(to, value, data));
        address signer = ecrecover(hash, v, r, s);
        require(signer == owner, "Invalid signature");

        // Execute the transaction
        (success, ) = to.call{value: value}(data);
        require(success, "Transaction execution failed");

        emit TransactionExecuted(to, value, data);
    }

    // Function to recover the signer from the signature
    function recoverSigner(
        bytes32 hash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public pure returns (address) {
        return ecrecover(hash, v, r, s);
    }
}
