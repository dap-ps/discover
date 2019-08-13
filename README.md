# Discover  

Discover new and useful DApps that are mobile-friendly and easy to use. Viewing curated information does not require any special tools, though effecting the way information is ranked will require a web3 wallet, whether that is Status, MetaMask, Trust, Brave or whichever one you prefer.

You can learn more about bonded curves and how Discover works [here](https://our.status.im/discover-a-brave-new-curve/).

## Available Scripts

This project is based on Embark v4.0.1, with a few things customised for React. 

```
yarn run build:dev
```
or
```
yarn run build:prod
```

Builds the app into the `full-build` directory and creates the `app.zip` ready for use with ElasticBeanstalk.

## Deployed Contracts

Ropsten (the first is `STT`, the Status Test Token):

```
MiniMeToken: { address: '0xc55cf4b03948d7ebc8b9e8bad92643703811d162' },
Discover: { address: '0x008db8b84547982e8F6677D38e9b9ea64F3ccB8B' },
```

Mainnet:

```
MiniMeToken: { address: '0x744d70fdbe2ba4cf95131626614a1763df805b9e' },
Discover: { address: '0xC8d48B421eAFdD75d5144E8f06882Cb5F0746Bd2' },
```

## Running It Locally

The goal of our local build process is to abstract away the complexity with smart contracts so that you can focus on adding useful new functionality through React-based bounties that are easy to get started on.

#### Prerequisites

1. [Node v10](https://github.com/nvm-sh/nvm) or higher.
2. [Yarn](https://yarnpkg.com/).
3. [mongodb](https://www.mongodb.com/).

On Linux, setting up `mongodb` is as easy as `sudo apt install -y mongodb`, which will also start it automatically. You can stop/restart your local DB any time with `sudo systemctl stop mongodb`, or get its status with `sudo systemctl status mongodb`.

#### Begin

1. `export DB_CONNECTION=mongodb://localhost:27017/mydb`. Make sure you have `DB_CONNECTION` set as an ENV variable so the app knows where to find your local DB.
2. `yarn run build:localhost`. This will:
    1. Compile all you contracts using Embark, connecting to Ropsten and IPFS through an Infura gateway.
    2. Deploy a new instance of Discover onto the Ropsten test network for you to work from. It will only be deployed once, after that the address of your contract is stored in, and fetched from, `shared.development.chains.json`.
    3. Build the frontend, create a directory called `full-build`, move each directory from the `back-end` into it, and include the `frontend` as a directory of its own. It will make sure `node_modules` are installed, then you can serve everything in `full-build` by running:
3. `yarn server-start`. Navigate to `http://localhost:4000` to get developing cool new things for the future of curated information. 

#### Work to be done

1. Integrate Kyber functionality so that people can use (at least) SNT, ETH and DAI to participate in the store (it just gets exchanged in the background into SNT before being submitted to the contract).
2. Create a `downvote pool` for each DApp so that anyone can downvote by any amount, not just 1%. When the pool hits 1%, the downvote is sent to the contract. This will be important if people ever stake large amounts, 1% of which may be too expensive for individual users. It will potentially amplify "the community's" ability to respond to bad actors.
3. Integrate [embeddable whisper chats](https://github.com/status-im/status-chat-widget) into the site, so that it is easy to plug into the community chat directly "behind" each DApp (it's just the name of the DApp as a whisper topic, i.e. #cryptokitties).
4. Research a way to fetch information about popular DApps on Ethereum through non-economic metrics. Perhaps this means just plugging into an API from OpenSea/StateOfTheDApps for now and leveraging their work. Perhaps it means figuring out how to [gossip information about use of DApps via whisper](https://discuss.status.im/t/friend-to-friend-content-discovery-community-feeds/1212)?

 
#### Running unit tests

Use `embark test`

Will compile your contracts, with hot-reloading, and let you test them locally to your heart's content. 

#### Running slither

`slither . --exclude naming-convention --filter-paths token `

Make sure you get TrailofBits' [latest static analysis tool](https://securityonline.info/slither/), and do your own static analysis on the relevant contracts that will be deployed for Discover.
