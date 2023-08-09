'use strict';

// Import necessary modules
const { PeerRPCServer }  = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');
const { bootTwoGrapes } = require('../helper/helpers'); // Import the bootTwoGrapes function
const config = require('../helper/config.json'); // Import configuration

let grapes = null;

// Boot two Grape servers using the bootTwoGrapes function
bootTwoGrapes((err, g) => {
  if (err) throw err;
  grapes = g;
  // When the first Grape announces, log that it's ready
  grapes[0].once('announce', () => {
    console.log('Grapes are ready');
  });
});

// Create a Link instance to connect to the Grape server
const link = new Link({
  grape: config.server.url
});
link.start(); // Start the Link instance

// Create a PeerRPCServer instance using the Link and set a timeout
const peer = new PeerRPCServer(link, {
  timeout: 300000
});
peer.init(); // Initialize the PeerRPCServer

// Generate a random port number to listen on
const port = 1024 + Math.floor(Math.random() * 1000);

// Create a service for the PeerRPCServer to listen on the specified port
const service = peer.transport('server');
service.listen(port);

// Announce the service at regular intervals
setInterval(function () {
  link.announce('rpc_test', service.port, {});
}, 1000);

// Initialize an array to store orders
const orders = [];

// Handle incoming requests to the 'rpc_test' service
service.on('request', (rid, key, payload, handler) => {
  console.log('payload:', payload);
  orders.push(payload.order);

  // Call matchOrders to find and process matching orders
  const result = matchOrders(orders);
  console.log('Remaining orders:', orders);

  // Reply to the request handler with the transaction result and remaining orders
  handler.reply(null, { transaction: result, remaining_orders: orders });
});

// Function to match buy and sell orders
function matchOrders(orders) {
  const sellOrders = orders.filter(order => order.type === 'sell');
  const buyOrders = orders.filter(order => order.type === 'buy');
  let result = {};

  // Loop through buy and sell orders to find matches
  for (const buyOrder of buyOrders) {
    for (const sellOrder of sellOrders) {
      // Check for matching conditions
      if (buyOrder.price >= sellOrder.price && buyOrder.amount > 0 && sellOrder.amount > 0) {
        // Log the matched orders and details
        result = {
          msg: `Match found! Buying order ${buyOrder.id} matches with selling order ${sellOrder.id}`,
          buyOrder,
          sellOrder
        };

        // Calculate amount to trade and update remaining amounts
        const amountToTrade = Math.min(buyOrder.amount, sellOrder.amount);
        buyOrder.amount -= amountToTrade;
        sellOrder.amount -= amountToTrade;

        // Remove fully traded orders
        if (buyOrder.amount === 0) {
          orders.splice(orders.indexOf(buyOrder), 1);
        }
        if (sellOrder.amount === 0) {
          orders.splice(orders.indexOf(sellOrder), 1);
        }

        break; // Break the inner loop since this buy order is matched
      }
    }
  }

  return result;
}