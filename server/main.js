const reg = require('babel-register')
require('babel-polyfill')

process.env.PORT = process.env.PORT || 8080

global.__CLIENT__ = false

global.__SERVER__ = true

require('./app')