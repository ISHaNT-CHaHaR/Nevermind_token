const dappToken = artifacts.require('./dappToken.sol');
const Token = artifacts.require('./Token.sol');
contract('dappToken', (accounts) => {
   let TokenPrice = 1000000000000000;
   let buyer = accounts[1];
   let admin = accounts[0];
   let tokenAvailable = 75000;

   it('initializes the contract', async () => {
      const tokensale = await dappToken.deployed();

      assert.notEqual(tokensale.address, 0x0);

      let address = await tokensale.tokenContract();

      let price = await tokensale.tokenPrice();

      assert.equal(price, TokenPrice);
      assert.notEqual(address, 0x0);
   });

   it('token buying', async () => {
      const token = await Token.deployed();
      const tokensale = await dappToken.deployed();

      await token.transfer(tokensale.address, tokenAvailable, { from: admin });
      let number = 10;

      await tokensale.buyTokens(number, {
         from: buyer,
         value: number * TokenPrice,
      });
      let amount = await tokensale.tokenSold();
      assert.equal(amount.toNumber(), number);

      let balance = await token.balanceof(buyer);
      assert.equal(balance.toNumber(), number);

      let balanceSale = await token.balanceof(tokensale.address);
      assert.equal(balanceSale.toNumber(), tokenAvailable - number);
   });
});
