pragma solidity >=0.4.21 <0.7.0;

contract Token {
    // constructor
    // set the total no. of tokens
    // read the total no. of tokens
    uint256 public totalSupply;

    mapping(address => uint256) public balanceof;

    constructor(uint256 _initialSupply) public {
        balanceof[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    



}
