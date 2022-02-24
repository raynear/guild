//SPDX-License-Identifier: Unlicense
pragma solidity ^0.5.6;

import "hardhat/console.sol";
import "@klaytn/contracts/token/KIP17/KIP17Token.sol";

contract Collection is KIP17Token{

    constructor (string memory name, string memory symbol) public KIP17Token(name, symbol) {
    }
}
