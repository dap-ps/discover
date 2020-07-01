# Discover SNT Ranking

## Summary

In order to fulfill one of our whitepaper promises, we need a mechanism that uses SNT to curate DApps. While this is not the only mechanism we will make available to users to find interesting and relevant DApps, it is one of the most important, both for SNT utility and because economic mechanisms are at the heart of how we buidl sustainable peer-to-peer networks.

## Abstract

We propose using an exponential [bonded curve](https://beta.observablehq.com/@andytudhope/dapp-store-snt-curation-mechanism), which operates only on downvotes, to implement a simple ranking game. It is the most radical market feasible: the more SNT a DApp stakes, the higher it ranks, with one caveat. The more SNT staked, the cheaper it is for the community to move that DApp down the rankings.

## Motivation

Token Curated Registries, and other bonded curve implementations try to incentivise the user with some kind of fungible reward token (often with governance rights/requirements attached to it) in order to decentralise the curation of interesting information. However, this creates mental overhead for users (who must manage multiple tokens, all with different on-chain transactions required) and is unlikely to see high adoption.

Making the ranking algorithm transparent - and giving users an ability to affect it at a small cost to them should they feel very strongly - is potentially a more effective way to achieve decentralised curation.

## User Stories

An effective economic ranking mechanism, selected with the option `Ranked by SNT` (one of many filters), answers the following user stories from our [swarm doc](https://github.com/status-im/swarms/blob/master/ideas/317-dapps-store.md).

1. **I want to be confident a DApp is usable / not a scam.**
   1. Having an economic mechanism ensures that the DApps which rank highly quite literally are those providing the "most value" to the community. This is because SNT staked to rank is locked out of circulation, meaning each SNT stakeholder's own holding of SNT should increase in value. Coincidentally, the more SNT staked in total in the store, the stronger the assurance that any given DApp which ranks highly is useful and not a scam.
2. **As an SNT stakeholder, I would like to signal using SNT that I find a listing useful.**
   1. Achieved by "upvoting" in the UI. Importantly, upvotes do not effect the bonded curve, users simply donate SNT 1-1 directly to the DApp's `balance`.
3. **As an SNT stakeholder, I would like to signal using SNT that I find a listing to be not useful/poor quality/etc.**
   1. Achieved, on an increasingly cheap basis the more well-resourced a DApp is, by "downvoting" in the UI. Uses an exponential bonded curve to mint downvotes.
4. **As a DApp developer, I want to be able to propose/vote my DApp for inclusion.**
   1. Anybody can submit a DApp for inclusion and "vote" on it by calling `upvote` and adding SNT to its `balance`.

## Specification

#### Constants

1. `uint total` - total SNT in circulation.
2. `uint ceiling` - most influential parameter for [_shape_ of curves](https://beta.observablehq.com/@andytudhope/dapp-store-snt-curation-mechanism).
3. `uint max` - max SNT that any one DApp can stake.
4. `uint decimals` - the amount of decimal precision to use for the calculating `max`.
5. `uint safeMax` - protect against overflows into infinity in votesMinted.

#### Data Struct

1. `address developer` - the developer of the DApp, used to send SNT to when `downvote` or `withdraw` is called.
2. `bytes32 id` - a unique identifier for each DApp, potentially with other metadata associated with it, hence the `bytes32`.
3. `bytes metadata` - the name, url, category and IPFS hash of the DApp so that we can resolve it in the store correctly.
4. `uint balance` - keep track of the total staked on each DApp.
5. `uint rate = 1 - (balance/max)` - used to calculate `available` and `votesMinted`.
6. `uint available = balance * rate` - amount of SNT staked a developer can earn back. NB: this is equivalent to the `cost` of all downvotes.
7. `uint votesMinted = available ** (1/rate)` - total downvotes that are "minted".
8. `uint votesCast` - keep track of the downvotes already cast.
9. `uint effectiveBalance = balance - ((votesCast/(1/rate))*(available/votesMinted))`- the Effective Balance each DApp is actually ranked by in the UI.

### Constructor

1. Sets the address for the SNT contract based on arg passed in.
1. `uint total == 6804870174`
1. `uint ceiling = 292`, as this means the max is close to 2M SNT, and is a local minima for votesMinted.
1. `uint decimals = 1000000` - We're use 1/100th of the total SNT in circulation as our bound, based mostly on Twitter polls...
1. `uint max = (total * ceiling)/decimals`
1. `uint safeMax = 77 * max / 100` - 77% of the absolute max, due to limitations with bancor's power approximations in Solidity.

#### Methods

1. **createDapp** external
   1. params: `(bytes32 _id, uint _amount)`

Calls internal method `_createDApp`, passing in `msg.sender`, `_id` and `_amount`.

2. **upvote** external
   1. params:`(bytes32 _id, uint _amount)`

Calls internal method `_upvote`, passing in `msg.sender`, `_id` and `_amount`.

3. **downvote** external
   1. params: `bytes32 _id, uint _amount`

Calls `downvoteCost` to check the `_amount`, then calls internal method `_downvote`, passing in `msg.sender`, `_id` and `_amount`.

4. **withdraw** external
   1. params: `(bytes32 _id, uint _amount)`

Allow developers to reduce thier stake/exit the store provided that `_amount <= available`. Recalculate `balance`, `rate`, `available` and `votesMinted`. If `votesCast > votesMinted`, then set them equal so the maths is future-proof, and recalculate `effectiveBalance`.

Emit event containing new `effectiveBalance`.

5. **setMetadata** external
   1. params: `(bytes32 _id, bytes calldata _metadata)`

Checks that the person trying to set/update the metadata is the developer, then updates the metadata associated with the DApp at that `id` so that we can resolve it correctly client side.

7. **receiveApproval** external
   1. params: `(address _from, uint256 _amount, address _token, bytes _data)`

Included so that users need only sign one transaction when creating a DApp, upvoting or downvoting. Checks that the token (SNT), sender, and data are correct. Decodes the `_data` using `abiDecodeRegister`, checks the amount is correct and figures out which of the three "payable" functions (`createDApp`, `upvote`, and `downvote`) is being called by looking at the signature.

2. **upvoteEffect** external views
   1. params: `(bytes32 _id, uint _amount)`

Mock add `_amount` to `balance`, calculate `mRate`, `mAvailable`, `mVMinted`, and `mEBalance`.

Returns the difference between `mEBalance` and the actual `effectiveBalance`.

3. **downvoteCost** public view
   1. params: `(bytes32 _id)`

Specifying that each downvote must move the DApp down by 1% allows us to calculate the `cost` without integrating anything. Calculate the `votesRequired` to effect the DApp by the specified %.

Returns `balanceDownBy`, `votesRequired` and `cost`.

4. **\_createDApp** internal
   1. params: `(address _from, bytes32 _id, uint _amount)`

Accepts some nominal amount of tokens (> 0) and creates a new Data struct with the `_id` passed to it, setting the new struct's `balance` and using that to calculate `balance`, `rate`, `available`, `votesMinted` and `effectiveBalance` (which is == `balance` at first).

Emit event containing new `effectiveBalance`.

4. **\_upvote** internal
   1. params: `(address _from, bytes32 _id, uint _amount)`

Transfer SNT directly to the contract, which means donating directly to the DApp's `balance`, no money to the developer. Though the votes don't use a curve, we still need to recalculate `rate`, `available`, `votesMinted` and `effectiveBalance`.

Emit event containing new `effectiveBalance`.

4. **\_downvote** internal
   1. params: `(address _from, bytes32 _id, uint _amount)`

Send SNT from user directly to developer in order to downvote. Call `downvoteCost` to get `balance_down_by`, `votes_required` and `cost`.

Add `votesRequired` to `votesCast`, recalculate `effectiveBalance`, and subtract `cost` from `available` so that `withdraw` works correctly.

Emit event containing new `effectiveBalance`.

8. **abiDecodeRegister** private
   1. params: `(bytes memory _data)`

Helps decode the data passed to `receiveApproval` using assembly magic.

## Potential Attacks

1. **Sybil resistance?**
   1. If I create a lot of accounts for one DApp, will that increase it's ranking?
   2. If I vote for one DApp from lots of different accounts, in small amounts, rather than in 1 big amount from a single account, what effect does it have?

Creating many accounts for one DApp is not possible - each DApp is uniquely identified and by its `id` and ranked only by the amount of SNT staked on it. In the same way, there is no quadratic effect in this set up, so staking for a DApp from lots of different accounts in small amounts has no greater/lesser effect on its ranking than staking 1 large amount from a single account.

2. **Incentives to stake bad DApps and "force" the community to spend SNT to downvote?**

Remember, you never get back more SNT than you stake, so this is also economically sub-optimal. In addition, there will be a free "complaint" feature as part of the "downvote" screen. There is an important difference between "contractual" and "social" (i.e. the Status UI) reality. Status reserves the right to remove from our UI any DApp that actively violates [our principles](https://status.im/contribute/our_principles.html), though anyone else is free to fork the software and implement different social/UI rules for the same contractual reality. This protects even further against any incentive to submit bad/damaging DApps.

However, at the beginning of the Store, this is an attack vector: ranking highly requires but a small stake, and this could conceivably result in a successful, cheap hype campaign until we change the UI. The price of freedom is eternal vigilance.

3. **Stake a damaging DApp, force some downvotes, and then withdraw my stake?**

You can still never earn back quite as much as you initially staked, enforced by the condition in the `withdraw` function: `require(_amount <= available)`.

4. **What is left in the store when a DApp withdraws the SNT it staked?**

Simply `balance - available`, i.e. some small amount of SNT not available to be withdrawn.

## Rationale

This is a simple economic mechanism that

1. does not place high mental overheads on users and could conceivably be understood by a wider and non-technical audience and
2. does not require a lot of screen real estate (important on mobile). All that is required is a balance for each DApp and up/downvote carrots to it's right or left, a pattern already well understood on sites like Reddit etc.

Moreover, having SNT is not required to see (and benefit from) a well-curated list of DApps; only if you want to effect the rankings on that list do you require tokens, which also makes the UX considerably easier for non-technical users.

From the perspective of DApp Developers - they must still spend some capital to rank well, just as they currently do with SEO and AdWords etc., but _they stand to earn most of that back_ if the community votes on their product/service, and they can withdraw their stake at any time. The algorithm is entirely transparent and they know where they stand and why at all times.

## Notes

The beauty of Ethereum to me, can be summed up simply:

`By deploying immutable contracts to a shared, public computational surface - contracts whose data can be read deterministically by anyone with access to the internet - we can encode idealism into the way we run society.`

What's more, **what's different this time**, is that the idealism exists independently of the people who encoded it, who inevitably become corrupted, because we are all human.

However, there is hope in cryptoeconomics, which is not about egalitarianism, but about designing systems with no central point of control. Decentralisation is the goal; egalitarianism is a great success metric. But not the other way around, because egalitarianism is not something for which we can reasonably optimise.

## Copyright

Copyright and related rights for this specification waived via [CC0](https://creativecommons.org/publicdomain/zero/1.0/).
