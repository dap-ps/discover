import cc from 'cryptocompare'
import { getTokenLabel } from './currencies'

const COMPOUND_V2_API = 'https://api.compound.finance/api/v2/ctoken'
export const generatePairKey = (from, to) => `${from}_${to}`
export const getUsdPrice = async ticker => {
  const price = await cc.price(ticker, 'USD')
  return price
}

export const formatPercent = number =>
  Number(number).toLocaleString(undefined, {
    style: 'percent',
    minimumFractionDigits: 2,
  })

export const percentToGoal = (pledged, goal) =>
  formatPercent(Number(pledged) / Number(goal))

const supportedCompoundTokens = ['cETH', 'cDAI']
const getCompoundRates = async prices => {
  const values = {}
  const compound = await fetch(COMPOUND_V2_API)
  const res = await compound.json()
  res.cToken
    .filter(t => supportedCompoundTokens.includes(t.symbol))
    .forEach(t => {
      const {
        symbol,
        exchange_rate,
        underlying_price: { value },
      } = t
      const underlyingUsd = Number(value) * Number(prices['ETH']['USD'])
      const USD = Number(exchange_rate.value) * Number(underlyingUsd)
      values[symbol] = { USD }
    })
  return values
}
export const getPrices = async (currencies = ['ETH', 'SNT', 'DAI']) => {
  const prices = await cc.priceMulti(currencies.slice(0, 65), ['USD'])
  const compound = await getCompoundRates(prices)
  return { ...prices, ...compound, WETH: { ...prices['ETH'] } }
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

export const convertTokenAmountUsd = (token, amount, prices, currencies) => {
  if (!currencies) return 0
  const tokenLabel = getTokenLabel(token, currencies)
  if (!amount || !token || !prices[tokenLabel]) return 0
  const rate = prices[tokenLabel]['USD']
  const formatted = formatter.format(rate * amount)
  return formatted
}
