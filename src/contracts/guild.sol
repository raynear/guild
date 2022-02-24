//SPDX-License-Identifier: Unlicense
pragma solidity ^0.5.6;

import "hardhat/console.sol";
import "@klaytn/contracts/token/KIP17/KIP17Token.sol";

contract Guild {
    address public membership;
    address public collection;

    string public guildName;
    uint256 private guildRevenue = 32397;
    uint256 private memberRevenue = 456; //This value is set for a demonstration temporarily

    enum Option {
        SUPPLY,
        DISPOSE,
        DIVIDE
    }
    enum Done {
        INPROGRESS,
        APPROVED,
        DISAPPROVED,
        TERMINATED
    }

    struct Proposal {
        string content;
        address NFTContract;
        uint256 NFTId;
        uint256 price;
        uint256 option; //supply: 0, dispose: 1, divide: 2
        uint256 done; //in progress: 0, approved: 1, disapproved: 2, terminated: 3
    }

    uint256 lengthOfProposals = 0;
    mapping(uint256 => Proposal) proposals;

    mapping(bytes32 => bool) rented;

    constructor(
        string memory _guildName,
        address _membership,
        address _collection
    ) public {
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

    function proposeSupplyNFT(
        string memory _content,
        address _NFTContract,
        uint256 _NFTId,
        uint256 _price
    ) public {
        proposals[lengthOfProposals] = Proposal(
            _content,
            _NFTContract,
            _NFTId,
            _price,
            uint256(Option.SUPPLY),
            uint256(Done.INPROGRESS)
        );
        lengthOfProposals++;
    }

    function proposeDisposeNFT(
        string memory _content,
        address _NFTContract,
        uint256 _NFTId,
        uint256 _price
    ) public {
        proposals[lengthOfProposals] = Proposal(
            _content,
            _NFTContract,
            _NFTId,
            _price,
            uint256(Option.DISPOSE),
            uint256(Done.INPROGRESS)
        );
        lengthOfProposals++;
    }

    function proposeDividend(string memory _content, uint256 _price) public {
        proposals[lengthOfProposals] = Proposal(
            _content,
            address(0x0),
            0,
            _price,
            uint256(Option.DIVIDE),
            uint256(Done.INPROGRESS)
        );
        lengthOfProposals++;
    }

    function vote(uint256 _id, bool _votes) public {
        // This function is made for a demonstration temporarily
        require(
            KIP17Token(membership).balanceOf(msg.sender) > 0,
            "You don't have permission."
        );
        require(
            proposals[_id].done == uint256(Done.INPROGRESS),
            "This proposal settled"
        );
        if (_votes) {
            proposals[_id].done = uint256(Done.APPROVED);
        } else {
            proposals[_id].done = uint256(Done.DISAPPROVED);
        }
    }

    function supplyNFT(uint256 _id) public {
        require(
            proposals[_id].done == uint256(Done.APPROVED),
            "You can't handle this proposal"
        );
        require(
            KIP17Token(proposals[_id].NFTContract).ownerOf(
                proposals[_id].NFTId
            ) == msg.sender,
            "You dont have that NFT"
        );

        KIP17Token(proposals[_id].NFTContract).transferFrom(
            msg.sender,
            address(this),
            proposals[_id].NFTId
        );
        require(
            KIP17Token(proposals[_id].NFTContract).ownerOf(
                proposals[_id].NFTId
            ) == address(this),
            "Something wrong"
        );
        msg.sender.transfer(proposals[_id].price);
    }

    function disposeNFT(uint256 _id) public payable {
        require(
            proposals[_id].done == uint256(Done.APPROVED),
            "You can't handle this proposal"
        );
        require(proposals[_id].price == msg.value, "need more klay");
        if (msg.sender.balance < msg.value) {
            revert("not enough balance");
        }
        KIP17Token(proposals[_id].NFTContract).approve(
            msg.sender,
            proposals[_id].NFTId
        );
    }

    function giveDividend(uint256 _id) public {
        // This function is made for a demonstration temporarily
        require(
            proposals[_id].done == uint256(Done.APPROVED),
            "You can't handle this proposal"
        );
        msg.sender.transfer(proposals[_id].price);
    }

    function rentNFT(address _NFTContract, uint256 _NFTId) public payable {
        require(msg.value < 1, "need more klay");
        if (msg.sender.balance < msg.value) {
            revert("not enough balance");
        }
        KIP17Token(_NFTContract).approve(msg.sender, _NFTId);
        rented[
            keccak256(
                abi.encodePacked(
                    addressToString(_NFTContract),
                    uintToString(_NFTId)
                )
            )
        ] = true;
    }

    function returnNFT(address _NFTContract, uint256 _NFTId) public {
        require(
            KIP17Token(_NFTContract).ownerOf(_NFTId) == msg.sender,
            "You dont have that NFT"
        );

        KIP17Token(_NFTContract).transferFrom(
            msg.sender,
            address(this),
            _NFTId
        );
        require(
            KIP17Token(_NFTContract).ownerOf(_NFTId) == address(this),
            "Something wrong"
        );
        msg.sender.transfer(1);
        rented[
            keccak256(
                abi.encodePacked(
                    addressToString(_NFTContract),
                    uintToString(_NFTId)
                )
            )
        ] = false;
    }

    function isRentedNFT(address _NFTContract, uint256 _NFTId)
        public
        view
        returns (bool)
    {
        return
            rented[
                keccak256(
                    abi.encodePacked(
                        addressToString(_NFTContract),
                        uintToString(_NFTId)
                    )
                )
            ];
    }

    function getProposals() public view returns (string memory) {
        string memory ret = "";
        for (uint256 i = 0; i < lengthOfProposals; i++) {
            ret = string(
                abi.encodePacked(
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
                    ";"
                )
            );
        }
        return ret;
    }

    function getProposal(uint256 _index) public view returns (string memory) {
        return
            string(
                abi.encodePacked(
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
                    ";"
                )
            );
    }

    function addressToString(address _address)
        internal
        pure
        returns (string memory)
    {
        bytes32 _bytes = bytes32(uint256(uint160(_address)));
        bytes memory HEX = "0123456789abcdef";
        bytes memory _string = new bytes(42);
        _string[0] = "0";
        _string[1] = "x";
        for (uint256 i = 0; i < 20; i++) {
            _string[2 + i * 2] = HEX[uint8(_bytes[i + 12] >> 4)];
            _string[3 + i * 2] = HEX[uint8(_bytes[i + 12] & 0x0f)];
        }
        return string(_string);
    }

    function uintToString(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len - 1;
        while (_i != 0) {
            bstr[k--] = bytes1(uint8(48 + (_i % 10)));
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

    function() external payable {}
}
