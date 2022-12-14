const fs = require('fs')

module.exports = {
    getMoviesBy: (req, res) => {
        // step.1 ambil value dari request
        let dataQuery = req.query
        // step1.1 replace % dengan spasi
        dataQuery.status?.includes('%')? dataQuery.status = dataQuery.status.replace(/%/g, ' ') : dataQuery.status = dataQuery.status
        dataQuery.time?.includes('%')? dataQuery.time = dataQuery.time.replace(/%/g, ' ') : dataQuery.time = dataQuery.time
        // step2. ambil db.json
        let {movies} = JSON.parse(fs.readFileSync('./db/db.json'))

        // step3. manipulsai data
        let dataToSend = []
        movies.forEach((value) => {
            console.log(dataToSend)
            if(dataQuery.status === value.status && dataQuery.location === value.location && dataQuery.time === value.time){
                dataToSend.push(value)
            }
            else if(dataQuery.status === value.status && dataQuery.location === value.location){
                dataToSend.push(value)
            }
            else if(dataQuery.status === value.status && dataQuery.time === value.time){
                dataToSend.push(value)
            }
            else if(dataQuery.location === value.location && dataQuery.time === value.time){
                dataToSend.push(value)
            }
            else if(dataQuery.status === value.status){
                dataToSend.push(value)
            }
            else if(dataQuery.location === value.location){
                dataToSend.push(value)
            }
            else if(dataQuery.time === value.time){
                dataToSend.push(value)
            }
        })

        res.status(201).send({
            isError: false,
            message: 'Search Data Success',
            data: dataToSend
        })
    }
}