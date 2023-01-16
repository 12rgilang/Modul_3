const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'gilang.ramadhan011297@gmail.com', //email sender
        pass: 'cxvxxfxarcebtjjj' // key generate by google email
    },
    tis: {
        rejectUnauthorized: false
    }
})

module.exports = transporter