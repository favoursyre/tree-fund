//I want to create the contract to handle the donations

// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.9;

//Commencing the contract
contract Donation {
    address owner;
    uint256 totalDonations;

    struct DonationInfo {
        address owner;
        uint256 amount;
    }

    DonationInfo donation;
    DonationInfo[] donations;

    constructor() {
        owner = msg.sender;
    }

    //This function is triggered whenever a payment is made to the contract
    receive() external payable {
        donation = DonationInfo(msg.sender, msg.value);

        donations.push(donation);
        totalDonations += msg.value;
    }

    //This gets the donations
    function getDonations() external view returns (DonationInfo[] memory) {
        return donations;
    }

    //This gets the total donations
    function getTotalDonations() external view returns (uint256) {
        return totalDonations;
    }
}
