// Function to generate a random order object
function getRandomOrder() {
  return {
    id: Math.floor(Math.random() * 100) + 1, // Generate a random ID between 1 and 100
    type: Math.random() > 0.5 ? 'buy' : 'sell', // Randomly choose 'buy' or 'sell'
    price: Math.floor(Math.random() * 100) + 1, // Generate a random price between 1 and 100
    amount: Math.floor(Math.random() * 100) + 1 // Generate a random amount between 1 and 100
  };
}

// Export the getRandomOrder function to be used in other modules
module.exports = { getRandomOrder };