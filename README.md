# BFX

The BFX challenge

## Features

- Each client will have its own instance of the orderbook.
- Clients submit orders to their own instance of orderbook. The order is distributed to other instances, too.
- If a client's order matches with another order, any remainer is added to the orderbook, too.

## Tech

This project uses a number of open source projects to work properly:

- [Node.js (https://nodejs.org/en/)] - Evented I/O for the backend.
- [Jest (https://jestjs.io/)] - Testing framework designed to ensure correctness of any JavaScript codebase.

## Install

This project requires [Node.js](https://nodejs.org/) v14+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm install
```

## Run

Open your favorite Terminal and run these commands.

First step: Run the Server

```sh
# run server
1. Open a new terminal
2. Run: npm run server
```

Second step: Run the Client

```sh
# run client
1. Open another terminal
2. Run: npm run client
```

```sh
# run tests
$ npm run test
```

## Improvements

- The tests need to be completed (unfortunately, I didn't have time to finish them). If there's more time available, I can finish both the unit and integration tests. 
- I would have liked to use something more asynchronous like a lookup to keep an open connection between the Server and the Client and send data when necessary.
- I tried to keep it as simple as possible just to demonstrate the understanding of what was asked for within the proposed timeframe.
- If there were more hours available, it would be possible to emulate more peers, but this is what I could accomplish within the given time frame.

## License

MIT

**Free Software, Hell Yeah!**
