pragma solidity >=0.4.21 <0.7.0;

import "./Token.sol";

contract dappToken {
    address payable admin; // admin assigned

    uint256 public tokenPrice;

    uint256 public tokenSold;

    event Sell(address indexed _buyer, uint256 indexed _amount);

    Token public tokenContract; // instane of tokenContract for getting address and getting functions

    constructor(Token _tokenContract, uint256 _tokenPrice) public {
        // assign an admin.
        // Token contract
        // Token Price
        admin = msg.sender;
        tokenContract = _tokenContract;
        tokenPrice = _tokenPrice;
    }

    function mul(uint256 x, uint256 y) internal pure returns (uint256 z) {
        require(y == 0 || (z = x * y) / y == x, "ds-math-mul-overflow");
    }

    function buyTokens(uint256 _numberOfTokens) public payable {
        require(msg.value == mul(_numberOfTokens, tokenPrice), "Comformity"); // check if value paid is enough!

        require(
            tokenContract.balanceof(address(this)) >= _numberOfTokens,
            "not enough Tokens"
        ); // check if number of tokens are enough

        require(
            tokenContract.transfer(msg.sender, _numberOfTokens),
            "check if transfer is successful!"
        );

        tokenSold += _numberOfTokens;
        emit Sell(msg.sender, _numberOfTokens);
    }

    function endSale() public payable {
        // require admin
        require(msg.sender == admin, "Sale must end by admin only");
        // transfer remaining tokens to admin.
        require(
            tokenContract.transfer(
                admin,
                tokenContract.balanceof(address(this))
            ),
            "transferred remains back to admin!"
        );
        // destroy contract

        selfdestruct(admin);
    }
}
