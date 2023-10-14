// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ReferralContract {
    mapping(address => bool) public referrers;
    mapping(string => bool) public actionsRecorded;
    mapping(address => uint256) public commissionBalances;

    event ReferrerRegistered(address indexed referrer);
    event ActionRecorded(string referralLink);

    function registerReferrer() external {
        require(!referrers[msg.sender], "Already a registered referrer");
        referrers[msg.sender] = true;
        emit ReferrerRegistered(msg.sender);
    }

    function getReferralLink(address adContract, uint256 adId) external view returns (string memory) {
        return string(abi.encodePacked("https://referral.com/", adContract, "/", adId));
    }

    function recordAction(string memory referralLink) external {
        require(referrers[msg.sender], "Not a registered referrer");
        require(!actionsRecorded[referralLink], "Action already recorded");
        actionsRecorded[referralLink] = true;

        uint256 commissionAmount = 1 ether;  // Set commission amount
        commissionBalances[msg.sender] += commissionAmount;  // Update the referrer's commission balance

        emit ActionRecorded(referralLink);
    }

    function withdrawCommission() external {
        uint256 amount = commissionBalances[msg.sender];
        require(amount > 0, "No commission to withdraw");
        commissionBalances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);  // Transfer the commission to the referrer
    }
}
