// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Trail {
    address public owner;

    constructor() {
        owner = msg.sender;
    }
    
    struct Student {
        address user;
        string name;
        uint rollno;
        uint id;
    }
    mapping(address => Student[]) public child;

    function setChild(string memory _name, uint _rollno) public {
        child[msg.sender].push(Student(msg.sender,_name,_rollno,child[msg.sender].length));
    }

    function getChild() public view returns(Student[] memory) {
        return child[msg.sender];
    }

    function caller() public view returns(address) {
        return msg.sender;
    }

    function getParticular(uint _id) public view returns(Student memory) {
        return child[msg.sender][_id];
    }
    
}