
# Discover  

Discover new and useful DApps that are mobile-friendly and easy to use. Viewing curated information does not require any special tools, though effecting the way information is ranked will require a web3 wallet, whether that is Status, MetaMask, Trust, Brave or whichever one you prefer.

## Available Scripts

This project is based on Embark v4.0.1, with a few things customised for React. Currently, you'll need to run the app and Embark separately, in different tabs in your terminal. 

**`npm run build`**

Builds the app into the `build` directory.

## Running and building the app

### Step 1 Build the contracts and the embark artifacts

#### Step 1.1 Modify contracts.js
Modify the `config/contracts.js` file in order for embark to deploy and generate for you the correct contracts
Starting from line 76, replace what you have existingly for `MiniMeToken` and `Discover` with

```
MiniMeToken: {
	address: '0x2764b5da3696E3613Ef9864E9B4613f9fA478E75'
},
Discover: { address: '0xc13711209ba3d5b4cbbcb45f7f64643abb267dbd' },
```

If you need to deploy new version of the Discover contract the last line read the part below:

```
MiniMeToken: {
	address: '0x2764b5da3696E3613Ef9864E9B4613f9fA478E75'
},
Discover: {
	args: ['$MiniMeToken'],
},
```

remove any existing `.embark` directory and run `embark run testnet --noserver`. Once all deployments are done

 go to this etherscan address and check the address of the contract you've last deployed and place it in place of `0xc13711209ba3d5b4cbbcb45f7f64643abb267dbd` of the original configuration.

https://ropsten.etherscan.io/address/0x65767f95799109ba028e0397add89b0ef637e444

#### Step 1.2 Fix embark configuration

In embarkjs.js note row 532. If you find `this._ipfsConnection.id()` -> change it to `this._ipfsConnection.version()`
This is needed because Infura's IPFS has deprecated `id` endpoint, but it was used in embark in order to check if the Infura IPFS API is active.. The workaround above do the same as the deprecated functionality.

#### Step 1.3 Generate the embark contract artifacts

Run `embark build --contracts` in order to (re)generate `src/embarkArtifacts/contracts` directory. 

Note your `index.js` file inside. If it is broken (ending by trailing `'` instead of `}`), fix it by replacing the last comma with `}`.
Observe that you find near the beginning of the Discover.js and MiniMeToken.js files the addresses you supplied in Step 1.1

### Step 2. Run the client side app localy.

Run the client side application via `npm run start`.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.
 
**Important!** If you get `can't establish a connection to a node` error, try to open [http://localhost:3000](http://localhost:3000) in chrome browser.
 
### Step 3 - Run the unit tests

Use `embark test`

Will compile your contracts, with hot-reloading, and let you test them locally to your heart's content. 

### Step 4 - Building for deployment

Run the build procedure via `npm run build`. Once you are done, copy the contents of the build directory, in the `frontend` directory in the branch called `app-deployment`.

## Deployments Steps AWS

0. Zip everything in the app-deployment branch (maybe omit node_modules and `deployment` directories)
1. Go to [AWS ElasticBeanstal console](https://us-east-1.console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/environment/dashboard?applicationName=dev-dap-ps-app&environmentId=e-zcpbhkm3gw)

2. Click Upload and deploy button in the middle of the screen.

3. Choose the .zip file containing the code

4. Change the version if want to keep some exact numbering

5. Click Deploy

## Changing .env variables in AWS

If you've changed some smart contracts you need to change their addresses in the env variables.

1. Go to [AWS Configuration](https://us-east-1.console.aws.amazon.com/elasticbeanstalk/home?region=us-east-1#/environment/configuration?applicationName=dev-dap-ps-app&environmentId=e-zcpbhkm3gw) and on Software section click Modify
2. Scroll down and find Environment Properties
3. Change whatever property needs changing
4. Click Apply at the bottom right

## Running slither

`slither . --exclude naming-convention --filter-paths token `

Make sure you get TrailofBits' [latest static analysis tool](https://securityonline.info/slither/), and do your own static analysis on the relevant contracts that will be deployed for Discover.