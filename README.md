# Discover

Discover new and useful DApps that are mobile-friendly and easy to use. Viewing curated information does not require any special tools, though effecting the way information is ranked will require a web3 wallet, whether that is Status, MetaMask, Trust, Brave or whichever one you prefer.

You can learn more about bonded curves and how Discover works [here](https://our.status.im/discover-a-brave-new-curve/).


## Table of Contents

- [Stack](#stack)
- [Deployed Contracts](#deployed-contracts)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
<!-- - [License](#license) -->


### Stack
* Smart contract compiler Framework: [Embark v4.0.1](https://github.com/embarklabs/embark)
* JS Framework: [React](https://github.com/facebook/react) + [Typescript](https://github.com/microsoft/TypeScript)
* SEO & Metadata: [Helmet.js](https://helmetjs.github.io/)
* Blockchain components: [Ethers.js](https://github.com/ethers-io/ethers.js/) + [web3-react](https://github.com/NoahZinsmeister/web3-react)
* Styling: [JSS](https://cssinjs.org/?v=v10.0.3) + [Material UI](https://material-ui.com/)
* State management: [Redux](https://redux.js.org/) + [Redux-Saga](https://redux-saga.js.org/) + [Reselect](https://github.com/reduxjs/reselect)
* Template generation: [Plop](https://plopjs.com/) + [Handlebars.js](https://handlebarsjs.com/)
* Compiling: [Webpack](https://webpack.js.org/) + [Babel](https://babeljs.io/)
* Forms & Validation: [Formik](https://jaredpalmer.com/formik) + [Yup](https://github.com/jquense/yup)
* Notifications: [Toastify](https://fkhadra.github.io/react-toastify/)

### Structure

The boiler is set up as a [Yarn](https://yarnpkg.com/) workspace/monorepo, this allows for adding additional workspaces like `Blockchain` or `Server` if required and executing parallel scripts across all spaces.

### Webapp

The web app is structured as a standard React app, the important areas to note is the `/api`, `/domains`, `/containers` & `/components`.

The api interactions have helpers to automatically format form field data, collect access token headers and allow for reducer-esque api calling functions.

The domains folder acts as the apps main Daemon & singleton business logic management components, general app actions are managed here, reducers for the domain state, selectors etc can be found here. Domains are meant to be globally accessable services facilitated through Redux-Saga for async actions

The containers folder allows for managing the business logic of constructing selectors, action dispatch functions, and any complex operations that should be managed seperately from the mark up.

The components folder is for markup files & styling.

## Install

The goal of our local build process is to abstract away the complexity with smart contracts so that you can focus on adding useful new functionality through React-based bounties that are easy to get started on.

### Prerequisites

1. [Node v10](https://github.com/nvm-sh/nvm) or higher.
2. [Yarn](https://yarnpkg.com/).
3. [mongodb](https://www.mongodb.com/).

First, run yarn to install the workspace dependancies:

```
yarn install
```

On Linux, setting up `mongodb` is as easy as `sudo apt install -y mongodb`, which will also start it automatically. You can stop/restart your local DB any time with `sudo systemctl stop mongodb`, or get its status with `sudo systemctl status mongodb`. I recommend using the simple [robo3t](https://robomongo.org/download) to view and edit your DB easily (you'll need to set DApps to `APPROVED` to see `Edit` and `Withdraw` options and to see them appear in Categories etc.)

### Mongo set up

1. `export DB_CONNECTION=mongodb://localhost:27017/mydb`. Make sure you have `DB_CONNECTION` set as an ENV variable so the app knows where to find your local DB.
2. TODO`yarn run build:localhost`. This will:
    1. Compile all your contracts using Embark, connecting to Ropsten and IPFS through an Infura gateway.
    2. Deploy a new instance of Discover onto the Ropsten test network for you to work from. It will only be deployed once, after that the address of your contract is stored in, and fetched from, `shared.development.chains.json`.
    3. Build the frontend, create a directory called `full-build`, move each directory from the `Backend` into it, and include the `frontend` as a directory of its own. It will make sure `node_modules` are installed, then you can serve everything in `full-build` by running:
3. `yarn server-start`. Navigate to `http://localhost:4000` to get developing cool new things for the future of curated information.

**Note:**

1. Change this line in [Backend/config/index.js](https://github.com/dap-ps/discover/blob/master/Backend/config/index.js#L24) to your local Ropsten version of the contract, stored in `shared.development.chains.json`.
2. You'll need to visit [simpledapp.eth using Status](https://status.im/get/) -> Assets Tab -> Request `STT`. This is the Status Test Token on Ropsten that needs to be used with your instance of Discover in order to submit/upvote/downvote in your local app. Using a proper test network even for local development allows us to better understand what the user experience is actually like in production more easily.

## Usage

### Development

For running a local instance use the command:
```
yarn start:dev
```

### Template generator

To make use of the webapp template generator, first open a terminal and navigate to `./WebApp`, run the command `yarn generate` & follow the prompts.

### Build

To build the project across workspaces, at the root of the directory, run the command `yarn build`.

### Production build
1. Run `yarn` to install the relevant packages
2. Set the environment files with the required values in `Backend`, `Contracts` & `WebApp`
3. Run `yarn create:fullbuild`
4. `app.zip` will be found in the root of the repo

## Contributions

Frontend boilerplate designed & crafted originally by [@panterazar](https://github.com/panterazar)

General updates & modifications by [@RyRy79261](https://github.com/RyRy79261)

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

## Getting Started

The goal of our local build process is to abstract away the complexity with smart contracts so that you can focus on adding useful new functionality through React-based bounties that are easy to get started on.

#### 3 Prerequisites

1. [Node v10](https://github.com/nvm-sh/nvm) or higher.
2. [Yarn](https://yarnpkg.com/).
3. [mongodb](https://www.mongodb.com/).

On Linux, setting up `mongodb` is as easy as `sudo apt install -y mongodb`, which will also start it automatically. You can stop/restart your local DB any time with `sudo systemctl stop mongodb`, or get its status with `sudo systemctl status mongodb`. I recommend using the simple [robo3t](https://robomongo.org/download) to view and edit your DB easily (you'll need to set DApps to `APPROVED` to see `Edit` and `Withdraw` options and to see them appear in Categories etc.)

#### 4 Quick Steps

1. `export DB_CONNECTION=mongodb://localhost:27017/mydb`. Make sure you have `DB_CONNECTION` set as an ENV variable so the app knows where to find your local DB.
2. `yarn start:dev`. This will: 
    1. Compile all your contracts using Embark, connecting to Ropsten and IPFS through an Infura gateway.
    2. Deploy a new instance of Discover onto the Ropsten test network for you to work from. It will only be deployed once, after that the address of your contract is stored in, and fetched from, `shared.development.chains.json`. 

**Note:**

1. Change this line in [Backend/config/index.js](https://github.com/dap-ps/discover/blob/master/Backend/config/index.js#L24) to your local Ropsten version of the contract, stored in `shared.development.chains.json`.
2. You'll need to visit [simpledapp.eth using Status](https://status.im/get/) -> Assets Tab -> Request `STT`. This is the Status Test Token on Ropsten that needs to be used with your instance of Discover in order to submit/upvote/downvote in your local app. Using a proper test network even for local development allows us to better understand what the user experience is actually like in production more easily.

#### Work to be done

1. Integrate Kyber functionality so that people can use (at least) SNT, ETH and DAI to participate in the store (it just gets exchanged in the background into SNT before being submitted to the contract).
2. Create a `downvote pool` for each DApp so that anyone can downvote by any amount, not just 1%. When the pool hits 1%, the downvote is sent to the contract. This will be important if people ever stake large amounts, 1% of which may be too expensive for individual users. It will potentially amplify "the community's" ability to respond to bad actors.
3. Integrate [embeddable whisper chats](https://github.com/status-im/status-chat-widget) into the site, so that it is easy to plug into the community chat directly "behind" each DApp (it's just the name of the DApp as a whisper topic, i.e. #cryptokitties).
4. Research a way to fetch information about popular DApps on Ethereum through non-economic metrics. Perhaps this means just plugging into an API from OpenSea/StateOfTheDApps for now and leveraging their work. Perhaps it means figuring out how to [gossip information about use of DApps via whisper](https://discuss.status.im/t/friend-to-friend-content-discovery-community-feeds/1212)?


#### Running unit tests

Use `./node_modules/.bin/embark test`

To test a specific smart contract you can use `./node_modules/.bin/embark test test/Discover_spec.js`.

#### Running slither

`slither . --exclude naming-convention --filter-paths token`

Make sure you get TrailofBits' [latest static analysis tool](https://securityonline.info/slither/), and do your own static analysis on the relevant contracts that you are working on.

## Available Scripts

This project is based on Embark v4.0.1, with a few things customised for React.

```
yarn run build:dev
```
or
```
yarn run build
```

Builds the app into the `full-build` directory and creates the `app.zip` ready for use with ElasticBeanstalk.
