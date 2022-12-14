const Auth = (req, res, next) => {
    if(req.headers.authorization !== 'admin'){
        return res.status(401).send({
            isError: true,
            message: 'User Unauthorized',
            data: null
        })
    }

    next()
}

module.exports = Auth