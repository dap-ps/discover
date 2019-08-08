# Discover  

Discover new and useful DApps that are mobile-friendly and easy to use. Viewing curated information does not require any special tools, though effecting the way information is ranked will require a web3 wallet, whether that is Status, MetaMask, Trust, Brave or whichever one you prefer.

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
Discover: { address: '0x5bCF2767F86f14eDd82053bfBfd5069F68C2C5F8' },
```

## Running It Locally

Because we need a review stage for DApps, running this application locally can be challenging. We will fix this in due course.

#### Step 1.1 Understand The Contracts

Check the `config/contracts.js` file in order to check you're working with the correct contract instance and network.  

#### Step 1.2 Use Embark Locally

1. Run `./node_modules/.bin/embark build` to build locally. 
2. Go to L 125 of `src/embarkArtifacts/embarkjs.js` and change `_ipfsConnection.id()` to `_ipfsConnection.version()` due to IPFS deprecating their id() endpoint.

#### Step 1.3 Build the Application

1. Run `yarn run start`
2. You may find you still having issues to get it to work as it cannot fetch data from `http://localhost:3000/metadata/all`. We will fix this in due course.
 
#### Running unit tests

Use `embark test`

Will compile your contracts, with hot-reloading, and let you test them locally to your heart's content. 

#### Running slither

`slither . --exclude naming-convention --filter-paths token `

Make sure you get TrailofBits' [latest static analysis tool](https://securityonline.info/slither/), and do your own static analysis on the relevant contracts that will be deployed for Discover.
