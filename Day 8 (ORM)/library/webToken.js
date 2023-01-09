const webToken = require('jsonwebtoken')

module.exports = {
    createToken: (payload) => {
        return webToken.sign(payload, 'rahasia', {
            expiresIn: '5s'
        })
    },

    validateToken: (token) => {
        return webToken.verify(token, 'rahasia')
    }
}