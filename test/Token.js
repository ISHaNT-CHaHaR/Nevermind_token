const Token = artifacts.require('Token');

contract('Token', (accounts) => {
   it('must pass balance', async () => {
      const token = await Token.deployed();
      let adminBalance = await token.balanceof(accounts[0]);
 
      console.log(await token.name());
      console.log(await token.symbol());
      let total = await token.totalSupply();
      console.log(await token.standard());
      console.log(total.toNumber());
      assert(adminBalance.toNumber() === 1000000);
   });

   it('must transfer', async () => {
      const token = await Token.deployed();
      await token.transfer(accounts[1], 1, {
         from: accounts[0],
      });
      let balance = await token.balanceof(accounts[1]);
      let remain = await token.balanceof(accounts[0]);
      assert.equal(balance.toNumber(), 1);
   });
});

contract('Token', () => {
   it('must have same name', async () => {
      const token = await Token.deployed();
      let name = await token.name();
      assert(name === 'Nevermind_Token');
   });

   it('must have same symbol', async () => {
      const token = await Token.deployed();
      let symbol = await token.symbol();
      assert(symbol === 'NEV');
   });

   it('must have standard', async () => {
      const token = await Token.deployed();
      let standard = await token.standard();
      assert.equal(standard, 'NEV token V1', 'has correct standard');
   });
   it('must pass', async () => {
      const token = await Token.deployed();
      let i = await token.totalSupply();
      assert(i.toNumber() === 1000000);
   });
});

contract('Token', (accounts) => {
   it('must pass approval', async () => {
      const token = await Token.deployed();
      let flag = await token.approve.call(accounts[1], 8);

      await token.approve(accounts[1], 10, { from: accounts[0] });

      let allowance = await token.allowance(accounts[0], accounts[1]);

      assert.equal(allowance.toNumber(), 10);
      assert.equal(flag, true, 'must return true');
   });

   it('delegate Transfers', async () => {
      const token = await Token.deployed();
      let fromAccount = accounts[2];
      let toAccount = accounts[3];
      let spendingAccount = accounts[4];
      await token.transfer(fromAccount, 1000, { from: accounts[0] });
      await token.approve(spendingAccount, 1000, { from: fromAccount });
      await token.transferFrom(fromAccount, toAccount, 1000, {
         from: spendingAccount,
      });

      let balance1 = await token.balanceof(fromAccount);

      assert.equal(balance1.toNumber(), 0);

      let balance2 = await token.balanceof(toAccount);

      assert.equal(balance2.toNumber(), 1000);
   });
});
