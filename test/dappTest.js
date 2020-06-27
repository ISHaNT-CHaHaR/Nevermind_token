const dappToken = artifacts.require('dappToken.sol');

contract('dappToken', (accounts) => {
   let tokensale;
   it('initializes the contract', async () => {
      tokensale = await dappToken.deployed();

      assert.notEqual(tokensale.address, 0x0);

      let address = await tokensale.tokenContract();

      let price = await tokensale.tokenPrice();

      let TokenPrice = 1000000000000000;

      assert.equal(price, TokenPrice);
      assert.notEqual(address, 0x0);
   });
});
