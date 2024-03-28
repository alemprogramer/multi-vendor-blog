const morgan = require('morgan');


const middlewares = [
    morgan('dev'),
]

module.exports = middlewares