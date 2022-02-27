const authorResolver = require('./author');
const eventsResolver = require('./events');
const bookingsResolver = require('./booking');

const rootResolver = {
    ...authorResolver,
    ...eventsResolver,
    ...bookingsResolver
}

module.exports = rootResolver;