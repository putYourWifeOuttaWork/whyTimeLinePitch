const FINNHUB_API_KEY = 'csh3759r01qu99bfpum0csh3759r01qu99bfpumg';

const FALLBACK_PRICES = {
  'TSLA': 260.54,
  'NVDA': 788.17,
  'AAPL': 175.84,
  'MSFT': 407.33,
  'GOOGL': 142.71,
  'META': 474.99,
  'AMZN': 174.99
};

export const fetchStockPrices = async () => {
  try {
    const symbols = Object.keys(FALLBACK_PRICES);
    const promises = symbols.map(symbol => 
      fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.json();
        })
        .then(data => ({
          symbol,
          price: data.c // Current price
        }))
        .catch(error => {
          console.warn(`Failed to fetch ${symbol}:`, error);
          return {
            symbol,
            price: FALLBACK_PRICES[symbol]
          };
        })
    );
    
    const results = await Promise.all(promises);
    return results.reduce((acc, { symbol, price }) => ({
      ...acc,
      [symbol]: price
    }), {});
  } catch (error) {
    console.warn('Using fallback prices due to API error:', error);
    return FALLBACK_PRICES;
  }
};