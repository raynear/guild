//SPDX-License-Identifier: Unlicense
pragma solidity ^0.5.6;

import "hardhat/console.sol";
import "@klaytn/contracts/token/KIP17/KIP17Token.sol";

contract Membership is KIP17Token{

    constructor (string memory name, string memory symbol) public KIP17Token(name, symbol) {
    }

    function mintMembership(uint256 _amount) public {
        require(SafeMath.add(totalSupply(), _amount) < 10001, "Not enough membership");
        for (uint256 index = totalSupply(); index < _amount; index++) {
            mint(msg.sender,index);
        }
    }
}
