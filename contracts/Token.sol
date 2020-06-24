pragma solidity >=0.4.21 <0.7.0;

contract Token {
    // constructor
    // set the total no. of tokens
    // read the total no. of tokens

    // NAME
    string public name = "Nevermind_Token";

    string public symbol = "NEV";

    string public standard = "NEV token V1";

    uint256 public totalSupply;

    mapping(address => uint256) public balanceof;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    constructor(uint256 _initialSupply) public {
        balanceof[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }

    function transfer(address _to, uint256 _value)
        public
        returns (bool success)
    {
        require(balanceof[msg.sender] >= _value, "Insufficient balance"); /// check

        balanceof[msg.sender] -= _value; // deduct from current

        balanceof[_to] += _value; // add to _to

        emit Transfer(msg.sender, _to, _value); // emit event.
        return true;
    }


        


}
