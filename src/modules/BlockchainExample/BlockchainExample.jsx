import React from 'react'
import exampleImage from './dapp.image'

import BlockchainSDK from '../../common/blockchain'

let SERVICES = ''

const DAPP_DATA = {
  name: 'Test1',
  url: 'https://www.test1.com/',
  description: 'Decentralized Test DApp',
  category: 'test',
  dateCreated: Date.now(),
  image: exampleImage.image,
}

// setTimeout is used in order to wait a transaction to be mined
const getResult = async function(method, params) {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      const result = await SERVICES.DiscoverService[method](...params)
      resolve(result)
    }, 2000)
  })
}

/*
  Each transaction-function return tx hash
  createDApp returns tx hash + dapp id
*/
class Example extends React.Component {
  async getFullDApp(id) {
    return getResult('getDAppDataById', [id])
  }

  async createDApp() {
    await SERVICES.SNTService.generateTokens()
    // return SERVICES.DiscoverService.createDApp(10000, DAPP_DATA)
  }

  async upvote(id) {
    return getResult('upVote', [id, 1000])
  }

  async downvote(id, amount) {
    return getResult('downVote', [id, amount])
  }

  async withdraw(id) {
    return getResult('withdraw', [id, 500])
  }

  async upVoteEffect(id) {
    return getResult('upVoteEffect', [id, 10000])
  }

  async downVoteCost(id) {
    return getResult('downVoteCost', [id])
  }

  async setMetadata(id) {
    DAPP_DATA.category = 'updated'
    return getResult('setMetadata', [id, DAPP_DATA])
  }

  async logDiscoverMethods() {
    SERVICES = await BlockchainSDK.getInstance()
    // console.log(await SERVICES.DiscoverService.getDApps())
    const createdDApp = await this.createDApp()

    // const dappData = await this.getFullDApp(createdDApp.id)
    // console.log(`Created DApp :  ${JSON.stringify(dappData)}`)

    // document.getElementById('testImage').src = dappData.metadata.image

    // const downVote = await this.downVoteCost(createdDApp.id)
    // console.log(
    //   `Downvote TX Hash :  ${await this.downvote(createdDApp.id, downVote.c)}`,
    // )
    // console.log(`Upvote TX Hash :  ${await this.upvote(createdDApp.id)}`)
    // console.log(`Withdraw TX Hash :  ${await this.withdraw(createdDApp.id)}`)
    // console.log(
    //   `UpvoteEffect Result :  ${await this.upVoteEffect(createdDApp.id)}`,
    // )
    // console.log(
    //   `DownVoteCost Result :  ${await this.downVoteCost(createdDApp.id)}`,
    // )

    // console.log(
    //   `Set metadata TX Hash :  ${await this.setMetadata(createdDApp.id)}`,
    // )
    // console.log(
    //   `Updated DApp :  ${JSON.stringify(
    //     await this.getFullDApp(createdDApp.id),
    //   )}`,
    // )
  }

  render() {
    return (
      <div>
        <h1 onLoad={this.logDiscoverMethods()} />
        <img id="testImage" />
      </div>
    )
  }
}

export default Example
