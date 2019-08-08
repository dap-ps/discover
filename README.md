# Discover  

Discover new and useful DApps that are mobile-friendly and easy to use. Viewing curated information does not require any special tools, though effecting the way information is ranked will require a web3 wallet, whether that is Status, MetaMask, Trust, Brave or whichever one you prefer.

## Available Scripts

This project is based on Embark v4.0.1, with a few things customised for React. Currently, you'll need to run the app and Embark separately, in different tabs in your terminal. 

```
yarn run build:dev
```
or
```
yarn run build:prod
```

Builds the app into the `full-build` directory and creates the `app.zip` ready for use with ElasticBeanstalk.

## Running and building the app

### Step 1 Build the contracts and the embark artifacts

#### Step 1.1 Understand contracts.js

Check the `config/contracts.js` file in order to check you're working with the correct contract instance. The contracts on Ropsten point at these adresses (the first is `STT`, the Status Test Token):

```
MiniMeToken: { address: '0xc55cf4b03948d7ebc8b9e8bad92643703811d162' },
Discover: { address: '0x008db8b84547982e8F6677D38e9b9ea64F3ccB8B' },
```

On mainnet they are:

```
MiniMeToken: { address: '0x744d70fdbe2ba4cf95131626614a1763df805b9e' },
Discover: { address: '0x5bCF2767F86f14eDd82053bfBfd5069F68C2C5F8' },
```

If you need to deploy your own, you need to target your local machine when deploying.

**Tips:** Remove any existing `.embark` directory and run `embark run testnet --noserver`.

#### Step 1.2 Build the application and start it

```bash
npm run build:dev
npm run start
```
 
### Running unit tests

Use `embark test`

Will compile your contracts, with hot-reloading, and let you test them locally to your heart's content. 

### Step 4 - Building for deployment

Run the build procedure via `npm run build`. Once you are done, upload the app.zip into the ElasticBean instance appropriate to the environment and it should handle the rest for you.

## Running slither

`slither . --exclude naming-convention --filter-paths token `

Make sure you get TrailofBits' [latest static analysis tool](https://securityonline.info/slither/), and do your own static analysis on the relevant contracts that will be deployed for Discover.
