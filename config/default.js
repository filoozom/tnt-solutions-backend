module.exports = {
  influxdb: {
    database: 'tierion',
    host: 'localhost',
    port: 8086
  },
  coinmarketcap: {
    currencies: {
      fiat: [
        'AUD',
        'BRL',
        'CAD',
        'CHF',
        'CLP',
        'CNY',
        'CZK',
        'DKK',
        'EUR',
        'GBP',
        'HKD',
        'HUF',
        'IDR',
        'ILS',
        'INR',
        'JPY',
        'KRW',
        'MXN',
        'MYR',
        'NOK',
        'NZD',
        'PHP',
        'PKR',
        'PLN',
        'RUB',
        'SEK',
        'SGD',
        'THB',
        'TRY',
        'TWD',
        'USD',
        'ZAR'
      ],
      crypto: ['BTC', 'ETH', 'XRP', 'LTC', 'BCH']
    }
  }
}
