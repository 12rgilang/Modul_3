const webToken = require('jsonwebtoken')

module.exports = {
    createToken: (payload) => {
        return webToken.sign(payload, 'rahasia', {
            expiresIn: '1h'
        })
    },

    validateToken: (token) => {
        return webToken.verify(token, 'rahasia')
    }
}