import React, { useState } from 'react'
import EthScan, { HttpProvider } from '@mycrypto/eth-scan'
import {
  currencies as rootCurrencies,
  currencyOrder,
} from '../../utils/currencies'
import { getKyberCurrencies } from '../../remote/kyber'
import { getUsdPrice, getPrices, generatePairKey } from '../../utils/prices'
import styles from './TokenSelector.module.scss'

const TokenSelector = props => {
  const {} = props

  const network = 'mainnet' // "rinkeby"

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
    const { account } = this.state
    if (!acc && !account) return
    const addresses = currencies
      .filter(c => c.label !== 'ETH')
      .map(c => c.value)
    const balances = await scanner.getTokensBalance(acc || account, addresses)
    this.setState({ balances })
  }

  const getAndSetPrices = async () => {
    const currencies = this.currencies.map(c => c.label)
    const prices = await getPrices(currencies)
    return { prices }
  }

  const setCurrencies = async network => {
    const kyberCurrencies = await getKyberCurrencies(network)
    setCurrencies([...rootCurrencies, ...kyberCurrencies].sort(currencyOrder))
    // Update state
    await getAndSetPrices()
    // Update state
    getAndSetBalances()
  }

  useEffect(() => {
    setScanner(EthScan(new HttpProvider(Infura[network])))
    setCurrencies(network)
    setGraphClient(network)
    grabAddress()
  }, [])

  const [selectedToken, setSelectedToken] = useState('SNT')

  const [scanner, setScanner] = useState()

  const [account, setAccount] = useState()

  const [currencies, setCurrencies] = useState(rootCurrencies)
  console.log(styles)
  return (
    <section className={styles.ts__root}>
      <div className={styles.ts__select - root}>
        {currencies.map((currency, index) => (
          <div
            className={`option ${
              currency.label == selectedToken ? 'active' : ''
            }`}
            key={`currency-${index}`}
          >
            {currency.label}
          </div>
        ))}
      </div>
    </section>
  )
}

export default TokenSelector
