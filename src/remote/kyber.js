/*global web3*/
import ERC20 from '../embarkArtifacts/contracts/ERC20'
import { isNil } from 'ramda'
import {
  NEW_TOKEN_ICON_API,
  generateHumanReadibleFn,
  generateChainReadibleFn,
  getLpAllowance,
  generateSetApprovalFn,
} from '../utils/currencies'
import { checksumAddress } from '../utils/address'

function createERC20Instance(address) {
  return new web3.eth.Contract(ERC20._jsonInterface, address)
}

const imageUrls = {
  DAI:
    'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
}

function mapToCurrencyFormat(currency) {
  const { id, address, symbol, decimals } = currency
  const contract = createERC20Instance(address)
  return {
    value: address,
    label: symbol,
    img:
      imageUrls[symbol] ||
      `${NEW_TOKEN_ICON_API}/${checksumAddress(id)}/logo.png`,
    width: '2rem',
    contract,
    humanReadibleFn: generateHumanReadibleFn(decimals),
    chainReadibleFn: generateChainReadibleFn(decimals),
    getAllowance: spender => getLpAllowance(contract, spender),
    setAllowance: generateSetApprovalFn(contract),
  }
}

const omitCurrencies = new Set(['ETH', 'OMG'])
function currencyFilter(currency) {
  if (isNil(currency)) return false
  if (omitCurrencies.has(currency.symbol)) return false
  return true
}

export const kyberCurrencies = {
  ropsten: 'https://ropsten-api.kyber.network/currencies',
  mainnet: 'https://api.kyber.network/currencies',
}

export const getKyberCurrencies = async network => {
  const uri = kyberCurrencies[network]
  const res = await fetch(uri)
  let currencies = await res.json()
  currencies = currencies.data
  if (network !== 'mainnet') {
    const res = await fetch(kyberCurrencies['livenet'])
    let livenetCurrencies = await res.json()
    livenetCurrencies = livenetCurrencies.data
    return currencies
      .map(currency => {
        const { symbol } = currency
        const livenetCurrency = livenetCurrencies.find(c => c.symbol === symbol)
        return livenetCurrency ? { ...currency, id: livenetCurrency.id } : null
      })
      .filter(currencyFilter)
      .map(mapToCurrencyFormat)
  }
  return currencies.filter(currencyFilter).map(mapToCurrencyFormat)
}
