import * as Categories from './categories'

export default class DappModel {
  constructor() {
    // blockchain
    this.id = ''
    this.sntValue = 0

    // metadata
    this.email = ''
    this.name = ''
    this.image = ''
    this.desc = ''
    this.category = ''
    this.dateAdded = 0
    this.status = 'NEW'
  }

  clone() {
    return Object.assign(new DappModel(), this)
  }

  isApproved() {
    return this.status === 'APPROVED'
  }

  static instanceFromBlockchainWithMetadata(source) {
    return Object.assign(new DappModel(), source.metadata, {
      id: source.id,
      sntValue: parseInt(source.effectiveBalance, 10),
    })
  }
}

const RECENTLY_ADDED_SIZE = 50
// const HIGHEST_RANKED_SIZE = 50

export class DappState {
  constructor() {
    this.loaded = true
    this.dapps = []
    this.dappsHightestRanked = null
    this.dappsRecentlyAdded = null
    this.categoryMap = new Map()
    this.categoryMap.set(Categories.EXCHANGES, null)
    this.categoryMap.set(Categories.DEFI, null)
    this.categoryMap.set(Categories.MARKETPLACES, null)
    this.categoryMap.set(Categories.COLLECTIBLES, null)
    this.categoryMap.set(Categories.GAMES, null)
    this.categoryMap.set(Categories.SOCIAL_NETWORKS, null)
    this.categoryMap.set(Categories.UTILITIES, null)
    this.categoryMap.set(Categories.CRYPTO_ONRAMPS, null)
    this.categoryMap.set(Categories.OTHER, null)
  }

  clone() {
    const result = new DappState()
    result.dapps = [...this.dapps]
    return result
  }

  creditDapp(dapp) {
    for (let i = 0; i < this.dapps.length; i += 1)
      if (this.dapps[i].id === dapp.id) return this.updateDapp(dapp)
    return this.addDapp(dapp)
  }

  addDapp(dapp) {
    const result = new DappState()
    let pushed = false
    for (let i = 0; i < this.dapps.length; i += 1) {
      if (!pushed && dapp.sntValue > this.dapps[i].sntValue) {
        result.dapps.push(dapp)
        pushed = true
      }
      result.dapps.push(this.dapps[i].clone())
    }
    if (!pushed) result.dapps.push(dapp)
    return result
  }

  addDapps(dapps) {
    const result = new DappState()
    result.dapps = this.dapps.concat(dapps)
    result.dapps.sort((a, b) => {
      return b.sntValue - a.sntValue
    })
    return result
  }

  updateDapp(dapp) {
    const result = new DappState()
    for (let i = 0; i < this.dapps.length; i += 1) {
      if (dapp.id === this.dapps[i].id) result.dapps.push(dapp)
      else result.dapps.push(this.dapps[i].clone())
    }
    result.dapps.sort((a, b) => {
      return b.sntValue - a.sntValue
    })
    return result
  }

  getDappsByCategory(category) {
    let filtered = this.categoryMap.get(category)
    if (filtered === null) {
      filtered = this.dapps.filter(
        dapp => dapp.category === category && dapp.isApproved() === true,
      )
      this.categoryMap.set(category, filtered)
    }
    return filtered
  }

  getHighestRanked() {
    if (this.dappsHightestRanked === null) {
      this.dappsHightestRanked = this.dapps.filter(dapp => dapp.sntValue > 0)
    }
    return this.dappsHightestRanked
  }

  getRecentlyAdded() {
    if (this.dappsRecentlyAdded === null) {
      this.dappsRecentlyAdded = this.dapps
        .filter(dapp => dapp.isApproved() === true)
        .sort((a, b) => {
          return (
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
          )
        })
        .slice(0, RECENTLY_ADDED_SIZE)
    }
    return this.dappsRecentlyAdded
  }
}

const dappsInitialState = new DappState()
dappsInitialState.loaded = false
export { dappsInitialState }
