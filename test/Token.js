const Token = artifacts.require('Token');

contract('Token', (accounts) => {
   it('must pass', async () => {
      const token = await Token.deployed();
      let i = await token.totalSupply();
      assert(i.toNumber() === 1000000);
   });
   it('must pass balance', async () => {
      const token = await Token.deployed();
      let adminBalance = await token.balanceof(accounts[0]);

      assert(adminBalance.toNumber() === 1000000);
   });
});
