
# Discover  

Discover new and useful DApps that are mobile-friendly and easy to use. Viewing curated information does not require any special tools, though effecting the way information is ranked will require a web3 wallet, whether that is Status, MetaMask, Trust, Brave or whichever one you prefer.

## Available Scripts

This project is based on Embark v4.0.1, with a few things customised for React. Currently, you'll need to run the app and Embark separately, in different tabs in your terminal. 

**`npm run build`**

Builds the app into the `build` directory.
  
**Steps to run the app:**

* ### `embark run testnet --noserver`
	Will connect to the ropsten blockchain and IPFS through Infura

	**Ropsten contracts:**

	1. SNT - 0x2764b5da3696E3613Ef9864E9B4613f9fA478E75
	2. Discover - 0x9591a20b9B601651eDF1072A1Dda994C0B1a5bBf

	**Manual needed steps:**
	Once embark is running:
	1.  In embarkjs.js (row 532) -> change `this._ipfsConnection.id()` to be `this._ipfsConnection.version()`
		This is needed because Infura's IPFS has deprecated `id` endpoint, but it was used in embark in order to check if the Infura IPFS API is active.. The workaround above do the same as the deprecated functionality.
	2.  In embark.json -> Change the row `"generationDir": "src/embarkArtifacts"` to `"generationDir": "embarkArtifacts"`. In this way you should not need to do step 1 every time you run `embark run testnet`.
 
* ### `npm run start`

Runs the app in the development mode.  

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits. You will also see any lint errors in the console.
 
**Important!** If you get `can't establish a connection to a node` error, try to open [http://localhost:3000](http://localhost:3000) in chrome browser.
 
### `embark test`

Will compile your contracts, with hot-reloading, and let you test them locally to your heart's content. 

### slither . --exclude naming-convention --filter-paths token 

Make sure you get TrailofBits' [latest static analysis tool](https://securityonline.info/slither/), and do your own static analysis on the relevant contracts that will be deployed for Discover.