'use strict'

const { Grape } = require('grenache-grape')
const waterfall = require('async/waterfall')
const config = require('./config.json');

function bootTwoGrapes (cb) {
    const grape1 = new Grape({
      dht_port: config.server.grape1.dht_port,
      dht_bootstrap: config.server.grape1.dht_bootstrap,
      api_port: config.server.grape1.api_port
    })
    const grape2 = new Grape({
      dht_port: config.server.grape2.dht_port,
      dht_bootstrap: config.server.grape2.dht_bootstrap,
      api_port: config.server.grape2.api_port
    })
  
    waterfall([
      (cb) => {
        grape1.start()
        grape1.once('ready', cb)
      },
      (cb) => {
        grape2.start()
        grape2.once('node', cb)
      }
    ], () => {
      cb(null, [grape1, grape2])
    })
  }

  function killGrapes (grapes, done) {
    grapes[0].stop((err) => {
      if (err) throw err
      grapes[1].stop((err) => {
        if (err) throw err
        done()
      })
    })
  }

  module.exports = { bootTwoGrapes, killGrapes };