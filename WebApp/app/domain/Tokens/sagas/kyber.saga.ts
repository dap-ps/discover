export const KYBER_CURRENCIES = {
  ropsten: 'https://ropsten-api.kyber.network/currencies',
  mainnet: 'https://api.kyber.network/currencies',
};

export interface KyberERC20Token {
  symbol: string;
  name: string;
  decimals: number;
  address: string;
  id: string;
  active?: boolean;
  reserves_src: string[];
  reserves_dest: string[];
  custom_proxy?: boolean;
  original_token?: string;
}

const omitCurrencies = new Set(['ETH', 'OMG']);
function currencyFilter(currency: KyberERC20Token): boolean {
  if (omitCurrencies.has(currency.symbol)) return false;
  return true;
}

export const getKyberCurrencies = async (network) => {
  const uri = KYBER_CURRENCIES[network];
  const res = await fetch(uri);

  let currencies: KyberERC20Token[] = (await res.json()).data;
  // if (network !== 'mainnet') {
  //   const res = await fetch(KYBER_CURRENCIES['livenet'])
  //   let livenetCurrencies = await res.json()
  //   livenetCurrencies = livenetCurrencies.data
  //   return currencies
  //     .map(currency => {
  //       const { symbol } = currency
  //       const livenetCurrency = livenetCurrencies.find(c => c.symbol === symbol)
  //       return livenetCurrency ? { ...currency, id: livenetCurrency.id } : null
  //     })
  //     .filter(currencyFilter)
  //     .map(mapToCurrencyFormat)
  // }
  return currencies.filter(currencyFilter);
};
