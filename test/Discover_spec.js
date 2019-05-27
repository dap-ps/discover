const TestUtils = require("../utils/testUtils");

const Discover = require('Embark/contracts/Discover');
const SNT = embark.require('Embark/contracts/SNT');


config({
  deployment: {
    accounts: [
      {
        mnemonic: "foster gesture flock merge beach plate dish view friend leave drink valley shield list enemy",
        balance: "5 ether",
        numAddresses: "10"
      }
    ]
  },
  contracts: {
    "MiniMeToken": { "deploy": false },
    "MiniMeTokenFactory": {},
    "SNT": {
      "instanceOf": "MiniMeToken",
      "args": [
        "$MiniMeTokenFactory",
        "0x0000000000000000000000000000000000000000",
        0,
        "TestMiniMeToken",
        18,
        "SNT",
        true
      ]
    },
    "Discover": {
      args: ["$SNT"]
    },
    "TestBancorFormula": {}
  }
}, (_err, web3_accounts) => {
  accounts = web3_accounts
});

contract("Discover", function () {

  this.timeout(0);

  it("should set max and safeMax values correctly", async function () {
    let resultMax = await Discover.methods.max().call();
    let resultSafeMax = await Discover.methods.safeMax().call();
    let expectedMax = 6804870174 * 292 / 1000000;
    let expectedSafeMax = expectedMax * 77 / 100 - 1;
    assert.strictEqual(parseInt(resultMax, 10), Math.round(expectedMax));
    assert.strictEqual(parseInt(resultSafeMax, 10), Math.round(expectedSafeMax));
  });

  it("should create a new DApp and initialise it correctly", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let amount = 1000;
    let metadata = "QmSmv5e5DYc2otwWcpUzuqmt389s3HHx651TbxDvKBFFue";

    await SNT.methods.generateTokens(accounts[0], amount).send();
    const encodedCall = Discover.methods.createDApp(id, amount, TestUtils.getBytes32FromIpfsHash(metadata)).encodeABI();
    await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[0] });

    let receipt = await Discover.methods.dapps(0).call();
    let developer = accounts[0];

    assert.strictEqual(developer, receipt.developer);
    assert.strictEqual(id, receipt.id);
    assert.strictEqual(metadata, TestUtils.getIpfsHashFromBytes32(receipt.metadata));

    // Check Discover actually receives the SNT!
    let bal_receipt = await SNT.methods.balanceOf(Discover.options.address).call();
    assert.strictEqual(amount, parseInt(bal_receipt, 10));

    // Having received the SNT, check that it updates the particular DApp's storage values
    assert.strictEqual(amount, parseInt(receipt.balance, 10));

    let max = await Discover.methods.max().call();
    let decimals = await Discover.methods.decimals().call();
    let rate = Math.round(decimals - (amount * decimals / max));
    assert.strictEqual(rate, parseInt(receipt.rate, 10));

    let available = amount * rate;
    assert.strictEqual(available, parseInt(receipt.available, 10));

    let votes_minted = Math.floor((available / decimals) ** (decimals / rate));
    assert.strictEqual(votes_minted, parseInt(receipt.votesMinted, 10));

    assert.strictEqual(0, parseInt(receipt.votesCast, 10));
    assert.strictEqual(amount, parseInt(receipt.effectiveBalance, 10));
  })

  it("should not create a new DApp with the same ID", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let amount = 1000;
    let metadata = 'QmSmv5e5DYc2otwWcpUzuqmt389s3HHx651TbxDvKBFFue';

    await SNT.methods.generateTokens(accounts[0], amount).send();
    const encodedCall = Discover.methods.createDApp(id, amount, TestUtils.getBytes32FromIpfsHash(metadata)).encodeABI();

    try {
      await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[0] });
      assert.fail('should have reverted before');
    } catch (error) {
      TestUtils.assertJump(error);
    }
  })

  it("should not create a new DApp when exceeding the ceiling or staking nothing", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let metadata = 'QmSmv5e5DYc2otwWcpUzuqmt389s3HHx651TbxDvKBFFue';
    let initial = await Discover.methods.max().call();
    let amount = parseInt(initial, 10);
    let amount0 = 0;

    await SNT.methods.generateTokens(accounts[0], amount).send();

    const encodedCall = Discover.methods.createDApp(id, amount, TestUtils.getBytes32FromIpfsHash(metadata)).encodeABI();
    try {
      await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[0] });
      assert.fail('should have reverted before');
    } catch (error) {
      TestUtils.assertJump(error);
    }

    const encodedCall0 = Discover.methods.createDApp(id, amount0, TestUtils.getBytes32FromIpfsHash(metadata)).encodeABI();
    try {
      await SNT.methods.approveAndCall(Discover.options.address, amount0, encodedCall0).send({ from: accounts[0] });
      assert.fail('should have reverted before');
    } catch (error) {
      TestUtils.assertJump(error);
    }
  })

  it("should update the metadata correctly", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let metadata = "QmSmv5e5DYc2otwWcpUzuqmt389s3HHx651TbxDvKBFFeu";
    await Discover.methods.setMetadata(id, TestUtils.getBytes32FromIpfsHash(metadata)).send({ from: accounts[0] });
    let receipt = await Discover.methods.dapps(0).call();
    assert.strictEqual(TestUtils.getBytes32FromIpfsHash(metadata), receipt.metadata);
  })

  it("should not let anyone other than the developer update the metadata", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let metadata_actual = "QmSmv5e5DYc2otwWcpUzuqmt389s3HHx651TbxDvKBFFeu";
    let metadata = "QmSmv5e5DYc2otwWcpUzuqmt389s3HHx651TbxDvKBDDeu";
    try {
      await Discover.methods.setMetadata(id, TestUtils.getBytes32FromIpfsHash(metadata)).send({ from: accounts[1] });
      assert.fail('should have reverted before');
    } catch (error) {
      TestUtils.assertJump(error);
    }
    let receipt = await Discover.methods.dapps(0).call();
    assert.strictEqual(TestUtils.getBytes32FromIpfsHash(metadata_actual), receipt.metadata);
  })

  it("should handle first upvote correctly", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let amount = 100;

    let initial = await Discover.methods.dapps(0).call();
    let before = await SNT.methods.balanceOf(Discover.options.address).call();
    // This is the special case where no downvotes have yet been cast
    let up_effect = await Discover.methods.upvoteEffect(id, amount).call();

    await SNT.methods.generateTokens(accounts[0], amount).send();
    const encodedCall = Discover.methods.upvote(id, amount).encodeABI();
    await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[0] });

    let receipt = await Discover.methods.dapps(0).call();

    let developer = accounts[0];

    assert.strictEqual(developer, receipt.developer);
    assert.strictEqual(id, receipt.id);

    // Check Discover actually receives the SNT!
    let after = await SNT.methods.balanceOf(Discover.options.address).call();
    let bal_effect = parseInt(after, 10) - parseInt(before, 10);
    assert.strictEqual(bal_effect, amount);

    // Having received the SNT, check that it updates the particular DApp's storage values
    let upvotedBalance = parseInt(initial.balance, 10) + amount
    assert.strictEqual(upvotedBalance, parseInt(receipt.balance, 10));

    let max = await Discover.methods.max().call();
    let decimals = await Discover.methods.decimals().call();
    let rate = Math.ceil(decimals - (upvotedBalance * decimals / max));
    assert.strictEqual(rate, parseInt(receipt.rate, 10));

    let available = upvotedBalance * rate;
    assert.strictEqual(available, parseInt(receipt.available, 10));

    let votes_minted = Math.floor((available / decimals) ** (decimals / rate));
    assert.strictEqual(votes_minted, parseInt(receipt.votesMinted, 10));

    // Only true for upvotes made when there are no downvotes
    assert.strictEqual(0, parseInt(receipt.votesCast, 10));

    // The effective_balance should match upvoteEffect + initial.effectiveBalance
    let e_balance = parseInt(up_effect, 10) + parseInt(initial.effectiveBalance, 10);
    assert.strictEqual(e_balance, parseInt(receipt.effectiveBalance, 10));
  })

  it("should not let you upvote without spending SNT", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let amount = 0;

    await SNT.methods.generateTokens(accounts[0], 10000).send();
    const encodedCall = Discover.methods.upvote(id, amount).encodeABI();
    try {
      await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[0] });
      assert.fail('should have reverted before');
    } catch (error) {
      TestUtils.assertJump(error);
    }
  })

  it("should not let you upvote by an amount that exceeds the ceiling", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let initial = await Discover.methods.max().call();
    let amount = parseInt(initial, 10);

    await SNT.methods.generateTokens(accounts[0], amount).send();
    const encodedCall = Discover.methods.upvote(id, amount).encodeABI();
    try {
      await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[0] });
      assert.fail('should have reverted before');
    } catch (error) {
      TestUtils.assertJump(error);
    }
  })

  it("should handle first downvote correctly", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let cost = await Discover.methods.downvoteCost(id).call()
    let amount = parseInt(cost.c, 10);

    let developer = accounts[0];
    let initial = await Discover.methods.dapps(0).call();
    let bal_before = await SNT.methods.balanceOf(developer).call();

    await SNT.methods.generateTokens(accounts[1], amount).send();
    const encodedCall = Discover.methods.downvote(id, amount).encodeABI();
    await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[1] });

    let receipt = await Discover.methods.dapps(0).call();

    assert.strictEqual(developer, receipt.developer);
    assert.strictEqual(id, receipt.id);

    // Check the developer actually receives the SNT!
    let bal_after = await SNT.methods.balanceOf(developer).call();
    let bal_effect = parseInt(bal_after, 10) - parseInt(bal_before, 10)
    assert.strictEqual(bal_effect, amount);

    // Balance, rate, and votes_minted remain unchanged for downvotes
    assert.strictEqual(initial.balance, receipt.balance);
    assert.strictEqual(initial.rate, receipt.rate);
    assert.strictEqual(initial.votesMinted, receipt.votesMinted);

    let available = parseInt(initial.available, 10) - parseInt(cost.c, 10);
    assert.strictEqual(available, parseInt(receipt.available, 10));

    // This is only true for the first downvote
    assert.strictEqual(parseInt(receipt.votesCast, 10), parseInt(cost.vR, 10));

    let e_balance = parseInt(initial.effectiveBalance, 10) - parseInt(cost.b, 10);
    assert.strictEqual(e_balance, parseInt(receipt.effectiveBalance, 10));
  })

  it("should handle second downvote correctly", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let cost = await Discover.methods.downvoteCost(id).call()
    let amount = parseInt(cost.c, 10);
    let developer = accounts[0];

    let initial = await Discover.methods.dapps(0).call();
    let bal_before = await SNT.methods.balanceOf(developer).call();

    await SNT.methods.generateTokens(accounts[1], amount).send();
    const encodedCall = Discover.methods.downvote(id, amount).encodeABI();
    await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[1] });

    let receipt = await Discover.methods.dapps(0).call();

    assert.strictEqual(developer, receipt.developer);
    assert.strictEqual(id, receipt.id);

    // Check the developer actually receives the SNT!
    let bal_after = await SNT.methods.balanceOf(developer).call();
    let bal_effect = parseInt(bal_after, 10) - parseInt(bal_before, 10)
    assert.strictEqual(bal_effect, amount);

    // Balance, rate, and votes_minted remain unchanged for downvotes
    assert.strictEqual(initial.balance, receipt.balance);
    assert.strictEqual(initial.rate, receipt.rate);
    assert.strictEqual(initial.votesMinted, receipt.votesMinted);

    let available = parseInt(initial.available, 10) - parseInt(cost.c, 10);
    assert.strictEqual(available, parseInt(receipt.available, 10));

    let eff_v_cast = parseInt(receipt.votesCast, 10) - parseInt(initial.votesCast, 10);
    assert.strictEqual(eff_v_cast, parseInt(cost.vR, 10));

    let e_balance = parseInt(initial.effectiveBalance, 10) - parseInt(cost.b, 10);
    assert.strictEqual(e_balance, parseInt(receipt.effectiveBalance, 10));
  })

  it("should not let you downvote by the wrong amount", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let amount_above = 10000;
    let amount_below = 100;

    await SNT.methods.generateTokens(accounts[1], amount_above + amount_below).send();

    const encodedCall = Discover.methods.downvote(id, amount_above).encodeABI();
    try {
      await SNT.methods.approveAndCall(Discover.options.address, amount_above, encodedCall).send({ from: accounts[1] });
      assert.fail('should have reverted before');
    } catch (error) {
      TestUtils.assertJump(error);
    }

    const encodedCall1 = Discover.methods.downvote(id, amount_below).encodeABI();
    try {
      await SNT.methods.approveAndCall(Discover.options.address, amount_below, encodedCall1).send({ from: accounts[1] });
      assert.fail('should have reverted before');
    } catch (error) {
      TestUtils.assertJump(error);
    }
  })

  it("should handle upvotes correctly when votes have been cast", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let amount = 500;

    let initial = await Discover.methods.dapps(0).call();
    let before = await SNT.methods.balanceOf(Discover.options.address).call();
    let up_effect = await Discover.methods.upvoteEffect(id, amount).call();

    await SNT.methods.generateTokens(accounts[0], amount).send();
    const encodedCall = Discover.methods.upvote(id, amount).encodeABI();
    await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[0] });

    let receipt = await Discover.methods.dapps(0).call();
    let developer = accounts[0];

    assert.strictEqual(developer, receipt.developer);
    assert.strictEqual(id, receipt.id);

    // Check Discover actually receives the SNT!
    let after = await SNT.methods.balanceOf(Discover.options.address).call();
    let bal_effect = parseInt(after, 10) - parseInt(before, 10);
    assert.strictEqual(bal_effect, amount);

    // Having received the SNT, check that it updates the particular DApp's storage values
    let upvotedBalance = parseInt(initial.balance, 10) + amount
    assert.strictEqual(upvotedBalance, parseInt(receipt.balance, 10));

    let max = await Discover.methods.max().call();
    let decimals = await Discover.methods.decimals().call();
    let rate = Math.round(decimals - (upvotedBalance * decimals / max));
    assert.strictEqual(rate, parseInt(receipt.rate, 10));

    let available = upvotedBalance * rate;
    assert.strictEqual(available, parseInt(receipt.available, 10));

    let votes_minted = parseInt(receipt.votesMinted, 10);

    // Votes have been cast by this stage, so we need to check how many there are
    // and confirm that `upvote` still calculates the effective_balance correctly
    let votes_cast = parseInt(receipt.votesCast, 10);

    let e_balance = Math.ceil(upvotedBalance - ((votes_cast * rate / decimals) * (available / decimals / votes_minted)));
    assert.strictEqual(e_balance, parseInt(receipt.effectiveBalance, 10));

    // The effective_balance should also match upvoteEffect + initial.effectiveBalance
    let e_balance_2 = parseInt(up_effect, 10) + parseInt(initial.effectiveBalance, 10);
    assert.strictEqual(e_balance_2, parseInt(receipt.effectiveBalance, 10));
  })

  it("should return correct upvoteEffect for use in UI", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let amount = 10;

    let receipt = await Discover.methods.dapps(0).call();
    let effect = await Discover.methods.upvoteEffect(id, amount).call();

    // Mock receiving the SNT
    let mBalance = parseInt(receipt.balance, 10) + amount

    let max = await Discover.methods.max().call();
    let decimals = await Discover.methods.decimals().call();

    let mRate = Math.round(decimals - (mBalance * decimals / max));
    let mAvailable = mBalance * mRate;
    let mVMinted = Math.round((mAvailable / decimals) ** (decimals / mRate));

    // Votes have been cast by this stage, so we need to check how many there are
    // and confirm that `upvoteEffect` mocks the effect correctly
    let votes_cast = parseInt(receipt.votesCast, 10);
    let mEBalance = Math.ceil(mBalance - ((votes_cast * mRate / decimals) * (mAvailable / decimals / mVMinted)));
    let effect_calc = mEBalance - receipt.effectiveBalance;

    // Confirm that what is returned is (mEBalance - d.effective_balance)
    assert.strictEqual(effect_calc, parseInt(effect, 10));
  })

  it("should throw already in upvoteEffect if you exceed the ceiling", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let initial = await Discover.methods.max().call();
    let amount = parseInt(initial, 10);
    try {
      await Discover.methods.upvoteEffect(id, amount).call();
      assert.fail('should have reverted before');
    } catch (error) {
      TestUtils.assertJump(error);
    }
  })

  it("should handle withdrawals correctly", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let amount = 100;

    let initial = await Discover.methods.dapps(0).call();
    let before = await SNT.methods.balanceOf(Discover.options.address).call();
    let before_dev = await SNT.methods.balanceOf(accounts[0]).call();
    let receipt_obj = await Discover.methods.withdraw(id, amount).send({ from: accounts[0] });
    let receipt = receipt_obj.events.Withdraw.returnValues;

    assert.strictEqual(id, receipt.id);

    // Check Discover actually sends SNT to the developer
    let after = await SNT.methods.balanceOf(Discover.options.address).call();
    let after_dev = await SNT.methods.balanceOf(accounts[0]).call();
    let difference = parseInt(before, 10) - parseInt(after, 10);
    let difference_dev = parseInt(after_dev, 10) - parseInt(before_dev, 10);

    assert.strictEqual(difference, amount)
    assert.strictEqual(difference_dev, amount)

    // Recalculate e_balance manually and check it matches what is returned
    let max = await Discover.methods.max().call();
    let decimals = await Discover.methods.decimals().call();

    let balance = parseInt(initial.balance, 10) - amount
    let rate = Math.ceil(decimals - (balance * decimals / max));
    let available = Math.round(balance * rate);
    let v_minted = Math.round((available / decimals) ** (decimals / rate));
    let v_cast = parseInt(initial.votesCast, 10);
    let e_balance = Math.ceil(balance - ((v_cast * rate / decimals) * (available / decimals / v_minted)));

    let effective_balance = parseInt(receipt.newEffectiveBalance, 10);

    // We begin to run into precision limitations in the BancorFormula here.
    // The higher the amount, the less accurate it becomes. Hence Math.ceil() for now.
    assert.strictEqual(e_balance, effective_balance);

    // Having withdrawn the SNT, check that it updates the particular DApp's storage values properly
    let check = await Discover.methods.dapps(0).call();

    let withdrawnBalance = parseInt(initial.balance, 10) - amount;
    assert.strictEqual(parseInt(check.balance, 10), withdrawnBalance);

    assert.strictEqual(parseInt(check.rate, 10), rate);
    assert.strictEqual(parseInt(check.available, 10), available);
    assert.strictEqual(parseInt(check.votesMinted, 10), v_minted);
  })

  it("should not allow withdrawing more than was staked", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let amount = 150000;
    try {
      await Discover.methods.withdraw(id, amount).send({ from: accounts[0] });
      assert.fail('should have reverted before');
    } catch (error) {
      TestUtils.assertJump(error);
    }
  })

  it("should not allow withdrawing more than was staked minus what has already been received", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let receipt = await Discover.methods.dapps(0).call();
    let amount = parseInt(receipt.available, 10) + 1;
    try {
      await Discover.methods.withdraw(id, amount).send({ from: accounts[0] });
      assert.fail('should have reverted before');
    } catch (error) {
      TestUtils.assertJump(error);
    }
  })

  it("should not allow anyone other than the developer to withdraw", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let amount = 1000;
    try {
      await Discover.methods.withdraw(id, amount).send({ from: accounts[1] });
    } catch (error) {
      TestUtils.assertJump(error);
    }
  })

  it("should handle downvotes after withdrawals correctly", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let cost = await Discover.methods.downvoteCost(id).call()
    let amount = parseInt(cost.c, 10);
    let developer = accounts[0];

    let initial = await Discover.methods.dapps(0).call();
    let bal_before = await SNT.methods.balanceOf(developer).call();

    await SNT.methods.generateTokens(accounts[1], amount).send();
    const encodedCall = Discover.methods.downvote(id, amount).encodeABI();
    await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[1] });

    let receipt = await Discover.methods.dapps(0).call();

    assert.strictEqual(developer, receipt.developer);
    assert.strictEqual(id, receipt.id);

    // Check the developer actually receives the SNT!
    let bal_after = await SNT.methods.balanceOf(developer).call();
    let bal_effect = parseInt(bal_after, 10) - parseInt(bal_before, 10)
    assert.strictEqual(bal_effect, amount);

    // Balance, rate, and votes_minted remain unchanged for downvotes
    assert.strictEqual(initial.balance, receipt.balance);
    assert.strictEqual(initial.rate, receipt.rate);
    assert.strictEqual(initial.votesMinted, receipt.votesMinted);

    let available = parseInt(initial.available, 10) - parseInt(cost.c, 10);
    assert.strictEqual(available, parseInt(receipt.available, 10));

    let eff_v_cast = parseInt(receipt.votesCast, 10) - parseInt(initial.votesCast, 10);
    assert.strictEqual(eff_v_cast, parseInt(cost.vR, 10));

    let e_balance = parseInt(initial.effectiveBalance, 10) - parseInt(cost.b, 10);
    assert.strictEqual(e_balance, parseInt(receipt.effectiveBalance, 10));
  })

  it("should handle upvotes after withdrawals correctly", async function () {
    let id = "0x7465737400000000000000000000000000000000000000000000000000000000";
    let amount = 100;

    let initial = await Discover.methods.dapps(0).call();
    let before = await SNT.methods.balanceOf(Discover.options.address).call();
    let up_effect = await Discover.methods.upvoteEffect(id, amount).call();

    await SNT.methods.generateTokens(accounts[0], amount).send();
    const encodedCall = Discover.methods.upvote(id, amount).encodeABI();
    await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[0] });

    let receipt = await Discover.methods.dapps(0).call();
    let developer = accounts[0];

    assert.strictEqual(developer, receipt.developer);
    assert.strictEqual(id, receipt.id);

    // Check Discover  actually receives the SNT!
    let after = await SNT.methods.balanceOf(Discover.options.address).call();
    let bal_effect = parseInt(after, 10) - parseInt(before, 10);
    assert.strictEqual(bal_effect, amount);

    // Having received the SNT, check that it updates the particular DApp's storage values
    let upvotedBalance = parseInt(initial.balance, 10) + amount
    assert.strictEqual(upvotedBalance, parseInt(receipt.balance, 10));

    let max = await Discover.methods.max().call();
    let decimals = await Discover.methods.decimals().call();
    let rate = Math.round(decimals - (upvotedBalance * decimals / max));
    assert.strictEqual(rate, parseInt(receipt.rate, 10));

    let available = upvotedBalance * rate;
    assert.strictEqual(available, parseInt(receipt.available, 10));

    let votes_minted = parseInt(receipt.votesMinted, 10);

    // Votes have been cast by this stage, so we need to check how many there are
    // and confirm that `upvote` still calculates the effective_balance correctly
    let votes_cast = parseInt(receipt.votesCast, 10);

    let e_balance = Math.ceil(upvotedBalance - ((votes_cast * rate / decimals) * (available / decimals / votes_minted)));
    assert.strictEqual(e_balance, parseInt(receipt.effectiveBalance, 10));

    // The effective_balance should also match upvoteEffect + initial.effectiveBalance
    let e_balance_2 = parseInt(up_effect, 10) + parseInt(initial.effectiveBalance, 10);
    assert.strictEqual(e_balance_2, parseInt(receipt.effectiveBalance, 10));
  })

  it("should create a DApp without overflowing", async function () {
    let id = "0x0000000000000000000000000000000000000000000000000000000000000001";
    let temp = await Discover.methods.safeMax().call();
    let amount = parseInt(temp, 10);
    let metadata = "QmSmv5e5DYc2otwWcpUzuqmt389s3HHx651TbxDvKBFFue";

    await SNT.methods.generateTokens(accounts[0], amount).send();
    const encodedCall = Discover.methods.createDApp(id, amount, TestUtils.getBytes32FromIpfsHash(metadata)).encodeABI();
    await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[0] });

    let receipt = await Discover.methods.dapps(1).call();
    let developer = accounts[0];

    assert.strictEqual(developer, receipt.developer);
    assert.strictEqual(id, receipt.id);

    // Having received the SNT, check that it updates the particular DApp's storage values
    assert.strictEqual(amount, parseInt(receipt.balance, 10));

    let max = await Discover.methods.max().call();
    let decimals = await Discover.methods.decimals().call();
    let rate = Math.ceil(decimals - (amount * decimals / max));
    assert.strictEqual(rate, parseInt(receipt.rate, 10));

    let available = amount * rate;
    assert.strictEqual(available, parseInt(receipt.available, 10));

    // It's checking that votesMinted doesn't overflow which we're really interested in here
    let votes_minted = Math.round((available / decimals) ** (decimals / rate));
    let returned = parseInt(receipt.votesMinted, 10);

    // Is going to be less than due to rounding inaccuracies at higher exponents
    assert.ok(returned <= votes_minted);
  })

  // Comment out line 263 in the contract to run this test properly and see 
  // the BancorFormula fail to find a suitable position in the maxExponentArray
  it("should prove we have the highest safeMax allowed for by Bancor's power approximation", async function () {
    let id = "0x0000000000000000000000000000000000000000000000000000000000000002";
    let max = await Discover.methods.max().call();
    // Choose a safeMax 1% higher than is currently set
    let percent = 78 / 100;
    let amount = Math.round(parseInt(max, 10) * percent);
    let metadata = "QmSmv5e5DYc2otwWcpUzuqmt389s3HHx651TbxDvKBFFue";

    await SNT.methods.generateTokens(accounts[0], amount).send();
    const encodedCall = Discover.methods.createDApp(id, amount, TestUtils.getBytes32FromIpfsHash(metadata)).encodeABI();

  // Comment this try/catch block out to test the safeMax
   try {
      await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[0] });
    } catch (error) {
      TestUtils.assertJump(error);
    }

    // Uncomment the next line to check this test. Change percent to 77 or 76 to see it pass.
    // await SNT.methods.approveAndCall(Discover.options.address, amount, encodedCall).send({ from: accounts[0] });
  })
});
