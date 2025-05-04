// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract TransferFromAccount2ToAccount1 {
    address public account1 = 0x20ecD7fF07a6ca193C9D799b98b39CF588E0DA96;
    address public account2 = 0xee651aea53A6221939790F7e62Cf8409f71cEf97;

    function transfer() public payable {
        require(msg.sender == account2, "Only account 2 can initiate transfers");
        require(msg.value > 0, "Amount must be greater than zero");

        payable(account1).transfer(msg.value);
    }

    // Function to receive Ether
    receive() external payable {}
}
