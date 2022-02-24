//SPDX-License-Identifier: Unlicense
pragma solidity ^0.5.6;

import "hardhat/console.sol";
import "@klaytn/contracts/token/KIP17/KIP17Token.sol";
import "@klaytn/contracts/token/KIP7/KIP7Mintable.sol";

contract Guild {
    address public membership;
    address public collection;
    address public myToken;

    string public guildName;
    uint256 private guildRevenue = 32397;
    uint256 private memberRevenue = 456;    //This value is set for a demonstration temporarily

    struct Proposal {
        string content;
        address NFTContract;
        uint256 NFTId;
        uint256 price;
        uint option; //supply: 0, dispose: 1, divide: 2
        uint done;  //in progress: 0, approved: 1, disapproved: 2, terminated: 3
    }

    uint256 lengthOfProposals = 0;
    mapping (uint256 => Proposal) proposals;

    mapping (bytes32 => bool) rented;

    constructor(string memory _guildName, address _myToken, address _membership, address _collection) public {
        myToken = _myToken;
        membership = _membership;
        collection = _collection;
        guildName = _guildName;
    }
    
    function getGuildRevenue() public view returns (uint256) {
        return guildRevenue;
    }

    function getMemberRevenue() public view returns (uint256) {
        return memberRevenue;
    }

    function proposeSupplyNFT(string memory _content, address _NFTContract, uint256 _NFTId, uint256 _price) public {
        proposals[lengthOfProposals] = Proposal(_content, _NFTContract, _NFTId, _price, 0, 0);
        lengthOfProposals++;
    }

    function proposeDisposeNFT(string memory _content, address _NFTContract, uint256 _NFTId, uint256 _price) public {
        proposals[lengthOfProposals] = Proposal(_content, _NFTContract, _NFTId, _price, 1, 0);
        lengthOfProposals++;
    }

    function proposeDividend(string memory _content, uint256 _price) public {
        proposals[lengthOfProposals] = Proposal(_content, address(0x0), 0, _price, 2, 0);
        lengthOfProposals++;
    }

    function vote(uint256 _id, bool _votes) public {
        // This function is made for a demonstration temporarily
        require(KIP17Token(membership).balanceOf(msg.sender) > 0, "You dont have permission.");
        require(proposals[_id].done == 0, "This proposal settled");
        if (_votes) {
            proposals[_id].done = 1;
        } else {
            proposals[_id].done = 2;
        }
    }

    function supplyNFT(uint256 _id) public {
        require(proposals[_id].done == 1, "You cant handle this proposal");
        require(KIP17Token(proposals[_id].NFTContract).ownerOf(proposals[_id].NFTId) == msg.sender, "You dont have that NFT");        
        KIP17Token(proposals[_id].NFTContract).transferFrom(msg.sender, address(this), proposals[_id].NFTId);
        require(KIP17Token(proposals[_id].NFTContract).ownerOf(proposals[_id].NFTId) == address(this), "Something wrong");
        require(KIP7Mintable(myToken).transfer(msg.sender, proposals[_id].price), "Failed to transfer token");

        proposals[_id].done = 3;
    }

    function disposeNFT(uint256 _id) public {
        require(proposals[_id].done == 1, "You cant handle this proposal");
        KIP17Token(proposals[_id].NFTContract).approve(msg.sender, proposals[_id].NFTId);
        require(KIP17Token(proposals[_id].NFTContract).getApproved(proposals[_id].NFTId) == msg.sender, "Not approved");
        require(KIP7Mintable(myToken).transferFrom(msg.sender, address(this), proposals[_id].price), "Failed to transfer token");

        proposals[_id].done = 3;
    }

    function giveDividend(uint256 _id) public {
        // This function is made for a demonstration temporarily
        require(proposals[_id].done == 1, "You cant handle this proposal");
        require(KIP7Mintable(myToken).transfer(msg.sender, proposals[_id].price), "Failed to transfer token");
        
        proposals[_id].done = 3;
    }

    function rentNFT(address _NFTContract, uint256 _NFTId) public payable {
        KIP17Token(_NFTContract).approve(msg.sender, _NFTId);
        require(KIP17Token(_NFTContract).getApproved(_NFTId) == msg.sender, "Not approved");
        rented[keccak256(abi.encodePacked(addressToString(_NFTContract), uintToString(_NFTId)))] = true;
    }

    function returnNFT(address _NFTContract, uint256 _NFTId) public {
        KIP17Token(_NFTContract).transferFrom(msg.sender, address(this), _NFTId);
        require(KIP17Token(_NFTContract).ownerOf(_NFTId) == address(this), "Something wrong");
        rented[keccak256(abi.encodePacked(addressToString(_NFTContract), uintToString(_NFTId)))] = false;
    }

    function isRentedNFT(address _NFTContract, uint256 _NFTId) public view returns (bool) {
        return rented[keccak256(abi.encodePacked(addressToString(_NFTContract), uintToString(_NFTId)))];
    }

    function getProposals() public view returns (string memory) {
        string memory ret = "";
        for (uint256 i = 0; i < lengthOfProposals; i++) {
            ret = string(abi.encodePacked(
                ret,
                uintToString(i),
                ";",
                proposals[i].content,
                ";",
                addressToString(proposals[i].NFTContract),
                ";",
                uintToString(proposals[i].NFTId),
                ";",
                uintToString(proposals[i].price),
                ";",
                uintToString(proposals[i].option),
                ";",
                uintToString(proposals[i].done),
                ";"));
        }
        return ret;
    }

    function getProposal(uint256 _index) public view returns (string memory) {
        return string(abi.encodePacked(
                uintToString(_index),
                ";",
                proposals[_index].content,
                ";",
                addressToString(proposals[_index].NFTContract),
                ";",
                uintToString(proposals[_index].NFTId),
                ";",
                uintToString(proposals[_index].price),
                ";",
                uintToString(proposals[_index].option),
                ";",
                uintToString(proposals[_index].done),
                ";"));
    }

    function addressToString(address _address) internal pure returns(string memory) {
        bytes32 _bytes = bytes32(uint256(uint160(_address)));
        bytes memory HEX = "0123456789abcdef";
        bytes memory _string = new bytes(42);
        _string[0] = '0';
        _string[1] = 'x';
        for(uint i = 0; i < 20; i++) {
            _string[2+i*2] = HEX[uint8(_bytes[i + 12] >> 4)];
            _string[3+i*2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
        }
        return string(_string);
    }

    function uintToString(uint _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint j = _i;
        uint len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint k = len - 1;
        while (_i != 0) {
            bstr[k--] = byte(uint8(48 + _i % 10));
            _i /= 10;
        }
        return string(bstr);
    }

    function boolToString(bool _b) internal pure returns (string memory) {
        if (_b == true) {
            return "true";
        }
        return "false";
    }

    function() external payable {
    
    }
}
