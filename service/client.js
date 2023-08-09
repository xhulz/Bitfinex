'use strict';

// Import necessary modules
const { PeerRPCClient }  = require('grenache-nodejs-http');
const Link = require('grenache-nodejs-link');
const config = require('../helper/config.json'); // Import configuration
const orders = require('../data/orders'); // Import orders data

// Create a new Link instance to connect to the Grape server
const link = new Link({
  grape: config.server.url
});
link.start(); // Start the Link instance

// Create a PeerRPCClient instance using the Link
const peer = new PeerRPCClient(link, {});
peer.init(); // Initialize the PeerRPCClient

// Set an interval to simulate sending requests
setInterval(function () {
  // Get a random order from the orders data
  const order = orders.getRandomOrder();
  
  // Make a request to the 'rpc_test' endpoint using the PeerRPCClient
  peer.request('rpc_test', { order }, {}, (err, data) => {
    if (err) {
      console.error(err);
      process.exit(-1); // Exit the process with an error code
    }
    console.log(data); // Log the received data
  });  
}, 1000); // Repeat the request every 1000 milliseconds (1 second)