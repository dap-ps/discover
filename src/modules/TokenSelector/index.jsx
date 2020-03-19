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

import styles from './TokenSelector.module.scss'

import ExchangeIcon from '../../common/assets/images/exchange.svg'

const TokenSelector = props => {
  const { valueInput } = props

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

  const setCurrenciesData = async network => {
    const kyberCurrencies = await getKyberCurrencies(network)
    const resolved = [...rootCurrencies, ...kyberCurrencies].sort(currencyOrder)
    setCurrencies(resolved)
    // Update state
    await getAndSetPrices(resolved)
    // Update state
    await getAndSetBalances(resolved)
  }

  const getAndSetPrices = async (cur = currencies) => {
    const parsedCurrencies = cur.map(c => c.label)
    const prices = await getPrices(parsedCurrencies)
    console.log('get & set ', prices)
    return { prices }
  }

  const getAndSetBalances = async (cur = currencies) => {
    // TODO need to refactor fetch logic into selectors
    let targetAccount
    if (window.ethereum) {
      await window.ethereum.enable()
      accountListener()
      const { selectedAddress: fetchedAccount } = window.ethereum
      targetAccount = fetchedAccount

      setAccount(account)
    } else {
      console.log('window.ethreum not found :', { window })
      return
    }

    const tokenAddresses = cur.filter(c => c.label !== 'ETH').map(c => c.value)

    // TODO: Provider fetched via Embark & Web3 throws invalid provider
    const fetchedBalances = await getTokensBalance(
      'https://api.mycryptoapi.com/eth',
      targetAccount,
      tokenAddresses,
    )
    setBalances(fetchedBalances)
    console.log(cur)
    console.log(fetchedBalances)
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
        <span>{selectedToken}</span>
        <img className={styles.icon} src={ExchangeIcon} />
        {selectedToken != 'SNT' && <span>~1.111 SNT</span>}
      </div>
      <section
        className={`${styles.modal}${modalActive ? ` ${styles.active}` : ''}`}
      >
        <div className={styles.selection}>
          <h3 className={styles.heading}>Select your prefered token</h3>
          {currencies &&
            balances &&
            currencies
              .filter(
                currency =>
                  currency.value != 'ETH' &&
                  (currency.label == 'SNT' ||
                    (balances[currency.value] &&
                      balances[currency.value]._hex != '0x00')),
              )
              .map((currency, index) => (
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
