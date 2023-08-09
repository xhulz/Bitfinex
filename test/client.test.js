const { PeerRPCClient, PeerRPCServer } = require('grenache-nodejs-http');
const { bootTwoGrapes, killGrapes } = require('../helper/helpers');
const config = require('../helper/config.json');
const orders = require('../data/orders');

describe('PeerRPCServer and PeerRPCClient Tests', () => {
  let grapes;

  function setupHooks (cb) {
    beforeEach(function (done) {
      this.timeout(20000)
      bootTwoGrapes((err, g) => {
        if (err) throw err
        grapes = g
        grapes[0].once('announce', () => {
          done()
        })
  
        cb()
      })
    })
  
    afterEach(function (done) {
      this.timeout(5000)
      killGrapes(grapes, done)
    })
  
    return grapes
  }

  it('should match orders correctly and update remaining orders', () => {
    // Create a mock handler for the PeerRPCServer
    const handler = {
      reply: jest.fn()
    };

    // Mock orders array
    const mockOrders = [
      // ... mock buy and sell orders ...
    ];

    // Call matchOrders with the mock orders array
    const result = matchOrders(mockOrders);

    // Verify that the handler.reply method was called with the correct parameters
    expect(handler.reply).toHaveBeenCalledWith(
      null,
      expect.objectContaining({
        transaction: expect.any(Object),
        remaining_orders: expect.any(Array)
      })
    );

    // Verify the result returned from matchOrders function
    expect(result).toEqual(expect.objectContaining({
      msg: expect.any(String),
      buyOrder: expect.any(Object),
      sellOrder: expect.any(Object)
    }));
  });
});
