pragma solidity >=0.4.21 <0.7.0;

import "./Token.sol";

contract dappToken {
    address admin;

    uint256 tokenPrice;

    Token public tokenContract;

    constructor(Token _tokenContract, uint256 _tokenPrice) public {
        // assign an admin.
        // Token contract
        // Token Price
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }
}
