const Token = artifacts.require('Token');
const dappToken = artifacts.require('dappToken');
module.exports = function (deployer) {
   deployer.deploy(Token, 1000000).then(function () {
      let tokenPrice = 1000000000000000;
      return deployer.deploy(dappToken, Token.address, tokenPrice);
      // 1st argument is for contract to be deployed, other are to be put according to constructor/
   });
};
