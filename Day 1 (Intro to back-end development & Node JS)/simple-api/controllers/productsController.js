module.exports = {
    getProducts: (req, res) => {
    // step 1 ambil data db.json
    let getData = JSON.parse(fs.readFileSync('./db/db.json'))

    // step. 2 kirim datanya dalam bentuk response
    res.status(201).send({
        isError: false,
        message: 'Get Data Success',
        data: getData
        })
    }
}