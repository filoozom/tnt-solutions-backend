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
router.get('/', async (req, res) => {
  const coin = await rp({
    uri: 'https://api.coinmarketcap.com/v2/ticker/1923/',
    json: true
  })

  const graphData = (await influx.query(`
      SELECT mean("total_active_nodes")
      FROM "autogen"."core"
      WHERE time >= now() - 30d
      GROUP BY time(6h) fill(previous)
    `))
    .map(value => ({
      name: value.time.toISOString(),
      nodes: Math.round(value.mean)
    }))
    .filter(value => !!value.nodes)

  res.json({
    graphData,
    tntPrice: coin.data.quotes.USD.price
  })
})

// Export
module.exports = router
