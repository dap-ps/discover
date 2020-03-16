import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {
  currencies as rootCurrencies,
  currencyOrder,
} from '../../utils/currencies'
import { getTokensBalance } from '@mycrypto/eth-scan'
import { getKyberCurrencies } from '../../remote/kyber'
import {
  // getUsdPrice,
  getPrices,
  // generatePairKey
} from '../../utils/prices'
import EmbarkJS from '../../embarkArtifacts/embarkjs'

import styles from './TokenSelector.module.scss'

const TokenSelector = props => {
  const {} = props

  const network = 'mainnet' // "rinkeby"

  const [selectedToken, setSelectedToken] = useState('SNT')

  const [account, setAccount] = useState()

  const [currencies, setCurrencies] = useState(rootCurrencies)

  const [balances, setBalances] = useState()

  const grabAddress = () => {
    if (window.ethereum) {
      accountListener()
      const { selectedAddress: account } = window.ethereum
      if (account) setAccount(account)
    } else {
      console.log('window.ethreum not found :', { window })
    }
  }

  const accountListener = () => {
    try {
      window.ethereum.on('accountsChanged', function(accounts) {
        const [account] = accounts
        setAccount(account)
      })
    } catch (error) {
      console.error('accountsChanged listener : ', { error })
    }
  }

  const getAndSetBalances = async acc => {
    if (!acc && !account) return
    const tokenAddresses = currencies
      .filter(c => c.label !== 'ETH')
      .map(c => c.value)
    const fetchedBalances = await getTokensBalance(
      EmbarkJS.Blockchain.Providers.web3.getCurrentProvider(),
      acc || account,
      tokenAddresses,
    )
    setBalances(fetchedBalances)
    console.log(fetchedBalances)
    // Parse
  }

  const getAndSetPrices = async () => {
    const parsedCurrencies = currencies.map(c => c.label)
    const prices = await getPrices(parsedCurrencies)
    console.log(prices)
    return { prices }
  }

  const setCurrenciesData = async network => {
    const kyberCurrencies = await getKyberCurrencies(network)
    setCurrencies([...rootCurrencies, ...kyberCurrencies].sort(currencyOrder))
    // Update state
    await getAndSetPrices()
    // Update state
    getAndSetBalances()
  }

  // Unsure if needed

  // setGraphClient = network => {
  //   const graphUri = uris[network]
  //   const client = new ApolloClient({
  //     uri: graphUri
  //   })
  //   this.client = client
  //   this.setState({ clientReady: true })
  // }

  useEffect(() => {
    //
    setCurrenciesData(network)
    // setGraphClient(network)
    grabAddress()
  }, [])

  return (
    <section className={styles.root}>
      {currencies &&
        currencies.map((currency, index) => (
          <div
            className={`${styles.option}${
              currency.label == selectedToken ? ` ${styles.active}` : ''
            }`}
            key={`currency-${index}`}
          >
            {currency.label}
          </div>
        ))}
    </section>
  )
}

const mapStateToProps = state => {}
const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TokenSelector),
)
