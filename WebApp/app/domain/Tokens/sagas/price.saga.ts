import cc from 'cryptocompare'

export const getPrices = async (currencies: string[]) => {
  currencies.push("ETH")
  let prices: {
    [symbol: string]: {
      [resolvedCurrency: string]: number
    }
  } = {};

  if(currencies.length > 65){
    const requests = Math.ceil(currencies.length / 65);
    for(let i = 0; i < requests; i++){
      prices = {
        ...prices,
        ...(await cc.priceMulti(currencies.slice((i * 65), ((i + 1) * 65)), ['SNT']))
      }
    }

  }else {
    prices = await cc.priceMulti(currencies, ['SNT'])
  }
  return { ...prices,  WETH: { ...prices['ETH'] } }
}
