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
    if (window.ethereum) {
      accountListener()
      const { selectedAddress: account } = window.ethereum
      setAccount(account)
    } else {
      console.log('window.ethreum not found :', { window })
      return
    }
    console.log(EmbarkJS.Blockchain.Providers.web3.getCurrentProvider())

    const tokenAddresses = currencies
      .filter(c => c.label !== 'ETH')
      .filter(c => {
        console.log(c)
        return true
      })
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

  useEffect(() => {
    setCurrenciesData(network)
  }, [])

  // Template state
  const [modalActive, setModalActive] = useState(false)

  const selectCurrency = selection => {
    setSelectedToken(selection)
    setModalActive(false)
  }

  return (
    <section className={styles.root}>
      <div className={styles.current} onClick={() => setModalActive(true)}>
        {selectedToken}
      </div>
      <section
        className={`${styles.modal}${modalActive ? ` ${styles.active}` : ''}`}
      >
        <div className={styles.selection}>
          <h3 className={styles.heading}>Select your prefered token</h3>
          {currencies &&
            currencies.map((currency, index) => (
              <div
                className={`${styles.option}${
                  currency.label == selectedToken ? ` ${styles.selected}` : ''
                }`}
                key={`currency-${index}`}
                onClick={() => selectCurrency(currency.label)}
              >
                {currency.label}
              </div>
            ))}
        </div>
      </section>
    </section>
  )
}

const mapStateToProps = state => {}
const mapDispatchToProps = dispatch => ({})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TokenSelector),
)
