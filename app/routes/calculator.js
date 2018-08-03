// Dependencies
const config = require('config')
const express = require('express')
const Influx = require('influx')
const rp = require('request-promise-native')

// Schema
const influx = new Influx.InfluxDB(config.get('influxdb'))

// Router
const router = express.Router()

// Routes
router.get('/active-nodes', async (req, res) => {
  const query = await influx.query(`
    SELECT mean("total_active_nodes")
    FROM "autogen"."core"
    WHERE time >= now() - 30d
    GROUP BY time(6h) fill(previous)
  `)

  const graphData = query
    .map(value => ({
      name: value.time.toISOString(),
      nodes: Math.round(value.mean)
    }))
    .filter(value => !!value.nodes)

  res.json(graphData)
})

router.get('/price/:currency?', async (req, res) => {
  const currency = (req.params.currency || 'USD').toUpperCase()
  const coin = await rp({
    uri: `https://api.coinmarketcap.com/v2/ticker/1923/?convert=${currency}`,
    json: true
  })

  Object.keys(coin.data.quotes).forEach(currency => {
    coin.data.quotes[currency] = coin.data.quotes[currency].price
  })

  res.json(coin.data.quotes)
})

router.get('/currencies', (req, res) => {
  res.json(config.get('coinmarketcap.currencies'))
})

// Export
module.exports = router
