const crypto = require('crypto')

const generateToken = (size = 48) => {
    return crypto.randomBytes(size).toString('hex')
}

module.exports = generateToken