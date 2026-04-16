const NodeCache = require('node-cache');
// Standard TTL of 5 minutes (300 seconds) to cache news API responses
const cache = new NodeCache({ stdTTL: 300 });

module.exports = cache;
