const express = require('express')
const app = express()
app.use(express.json())// body parser : mengambil data yang dikirimkan oleh client melalui body



const PORT = 5001

app.get('/', (req, res) => {
    res.status(201).send(`<h1>Welcome to JCWD-2302 API</h1>`)
})


// import router
const {productsRouter} = require('./routers')
app.use('/products', productsRouter)
// logic bussines nya dipindahkan kedalam products controller
// app.use('/products', (req, res) => {
//     // step 1 ambil data db.json
//     let getData = JSON.parse(fs.readFileSync('./db/db.json'))

//     // step. 2 kirim datanya dalam bentuk response
//     res.status(201).send({
//         isError: false,
//         message: 'Get Data Success',
//         data: getData
//     })
// })


 // logic bussines nya dipindahkan kedalam products controller
// app.post('/products', (req, res) => {
//     // step.1 ambil data dari client
//     let body = req.body
//     // step.2 simpan ke db.json
//     let getData = JSON.parse(fs.readFileSync('./db/db.json'))
//     let generateId = getData.products.length === 0 ? 1 : getData.products[getData.products.length-1].id + 1
//     getData.products.push({id: generateId, ...body})
//     fs.writeFileSync('./db/db.json', JSON.stringify(getData))
//     // step.3 kirim response
//     res.status(201).send({
//         isError: false,
//         message: 'Post Data Success',
//         data: null
//     })
// })

// app.patch('/products/:id', (req, res) => {
//     // step.1 Ambil id dari params
//     let id = parseInt(req.params.id)
//     // step.2 ambil data dari body
//     let body = req.body
//     // step3. read data dari db.json
//     let getData = JSON.parse(fs.readFileSync('./db/db.json'))
//     // step.4 Manipulsai data
//     let idx = null
//     getData.products.forEach((value, index) => {
//         if(value.id === id){
//             value.name = body.name
//             value.price = body.price 
//         }
//     })

//     // step5. save db.json
//     fs.writeFileSync('./db/db.json', JSON.stringify(getData))

//     // step.5 kirim response
//     res.status(201).send({
//         isError: false,
//         message: "Update Data Success",
//         data: null
//     })
// })

// app.delete('/products/:id', (req,res) => {
//     let id = req.params.id
//     let getData = JSON.parse(fs.readFileSync('./db/db.json'))
//     let idx = null
//     getData.products.forEach((value, index) => {
//         if(value.id === id) {
//             idx = index
//         }
//     })
//     getData.products.splice(idx, 1)

//     fs.writeFileSync('./db/db.json', JSON.stringify(getData))

//     // step.5 kirim response
//     res.status(201).send({
//         isError: false,
//         message: "Delete Data Success",
//         data: null
//     })
    
// })

app.listen(PORT, () => console.log(`API Running on port ${PORT}`))