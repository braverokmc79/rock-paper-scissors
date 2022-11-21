const rfs = require('rotating-file-stream') // version 2.x
const appRoot = require("app-root-path");

// create a rotating write stream
const accessLogStream = rfs.createStream(`${appRoot}/logs/morgan/access.log`, {
    interval: '1d', // rotate daily
})


module.exports = accessLogStream;