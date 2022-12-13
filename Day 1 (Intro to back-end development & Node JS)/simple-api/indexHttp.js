    const http = require('http')
    const fs = require('fs') // File system : untuk membaca document/file
    const PORT = 5000

    const server = http.createServer((req, res) => {
        if(req.url == '/products'){
            if(req.method === 'GET'){
                console.log('Masuk ke Products')
            // Step 1. ambil dat dari db
            let getData = fs.readFileSync('./db/db.json')
            // getData = JSON.parse(getData)
            // console.log(getData) // secara default filesync mereturn menggunakan binary, maka harus di parse
            res.writeHead(201, "Get data success")
            res.end(getData)
            }else if(req.method === 'POST'){
                // step.1 Ambil data dari client
                let body = []
                req.on('data', (data) => { // params data digunakan untuk mengamdil data daro client/postman
                    body.push(data)
                }).on('end', () => {
                    body = JSON.parse(body)
                    console.log(body)

                      // step.2 simpan datanya kedalam db.json
                    let getData = JSON.parse(fs.readFileSync('./db/db.json'))
                    getData.products.push(body)
                    fs.writeFileSync('./db/db.json', JSON.stringify(getData))
                    // step.3 kirim responnya
                    res.writeHead(201, 'Post Data Success')
                    res.end()
                })
              

                
            }
        }
    })

    server.listen(PORT, () => {
        console.log(`server Running on port ${PORT}`)
    })