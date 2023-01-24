// 1. Perhatikan code berikut!
/*
    const express = require('express')
    const app = express()

    app.get('/login', usersController, authController)
*/
// Function 'usersController' disebut dengan?
// a. Business Logic
// x Middleware
// c. Route
// d. Helpers



// 2. Berikut, pernyataan manakah yang tepat dalam REST API Operation?
// x POST request digunakan untuk menambahkan record (data), serta datanya dikirim
//    melalui body
// b. GET request digunakan untuk membaca record, serta mengirim response melalui params
// c. DELETE request digunakan untuk menghapus data, serta data biasanya dikirim melalui body
// d. Semua jawaban salah



// 3. Apakah file .env (untuk tahap production) perlu dicommit ke git repository? Apakah alasannya?
// a. Perlu, karena akan digunakan untuk konfigurasi server
// b. Harus dicommit, karena tanpa file .env di dalam repository, server tidak akan bisa berjalan
// x Sangat dianjurkan untuk tidak dicommit, karena biasanya mengandung informasi sensitive seperti API key
// d. Tidak perlu dicommit, karena hanya digunakan untuk testing



// 4. HTTP method dan route URL manakah yang paling mendekati "best practice" untuk membaca data satu user?
// a. POST /users/:id
// b. GET /users?id=id
// x GET /users/:id
// d. DELETE /users/:id



// 5. Perhatikan code berikut!
/*
    app.get('/products/:uid', async(req, res) => {
        ...
    })
*/
// :uid disebut sebagai?
// x Route Param
// b. Query Param
// c. Method Param
// d. Request Param



// 6. Perhatikan code berikut!
/*
    const authentication = (req, res, next) => {
        ...
    }
*/
// Apakah kegunaan params next?
// x Untuk meng-execute middleware berikutnya
// b. Untuk melakukan error handling
// c. Untuk mengirim response menuju user
// d. Untuk meng-execute route berikutnya



// 7. Apakah kegunaan dari library CORS?
// a. Untuk menjaga performa API kita agar tetap stabil
// b. Untuk membatasi jumlah request dalam satu waktu
// x Untuk mengatur dari mana saja API kita dapat menerima request
// d. Semua jawaban benar



// 8. Penggabungan 2 key di dalam satu table untuk membuat sebuah unique ID disebut?
// x Composite key
// b. Identifier key
// c. Modified key
// d. Unique key



// 9. Jika kita ingin menambahkan data ke database kita melalui API kita, 
//    HTTP method dan API URL mana yang paling tepat kita gunakan?
// a. PUT {url}/addNewUser
// x POST {url}/user
// c. PATCH {url}/user/:id
// d. POST {url}/user/:id



// 10. Jika kita berhasil menambahkan sebuah record baru ke database kita, 
//     HTTP response code mana yang paling tepat kita gunakan?
// x 2**
// b. 3**
// c. 4**
// d. 5**



// 11. Manakah perintah yang benar untuk menampilkan hanya data yang berbeda?
// x SELECT DISTINCT
// b. SELECT GROUPBY
// c. SELECT UNIQUE
// d. SELECT DIFFERENCE



// 12. Kamu ditugaskan untuk membuat database buku novel. 
//     Diketahui setiap buku bisa memiliki banyak kategori, dan setiap kategori bisa dimiliki oleh lebih 
//     dari 1 buku. Apa tipe relasi database yang tepat digunakan untuk case ini?
// a. O t M
// b. O t O
// x M t M
// d. M t O



// 13. Pernyataan manakah yang tidak sesuai dengan fitur yang disediakan Express JS?
// a. Membuat route yang akan melakukan proses yang berbeda-beda
// b. Membuat middleware untuk memberikan response terhadap request HTTP
// x Menerima file hasil upload client dan menyimpannya dalam server
// d. Semua jawaban salah



// 14. Apakah kita bisa membuat sebuah HTTP web server (REST API), 
//     menggunakan vanilla Node JS (tanpa library atau framework tambahan)?
// a. Bisa, menggunakan module "express"
// b. Bisa, menggunakan module "axios"
// x Bisa, menggunakan module "http"
// d. Tidak bisa, hanya bisa menggunakan framework tambahan



// 15. Berikut ini, manakah yang mendeskripsikan architecture NodeJS dengan tepat?
// a. Async
// b. Non-Blocking i/o model
// c. Event-driven
// x Semua jawaban benar



// 16. Berikut ini yang merupakan fitur dari SQL transaction adalah?
// a. Start & Rollback
// b. Commit & Push
// c. Pull & Rollback
// x Rollback & Commit



// 17. Apakah perbedaan antara PUT dengan PATCH?
// a. Tidak ada perbedaan
// b. PATCH digunakan ketika kita mengganti sebuah record/data secara seutuhnya. 
//    PUT akan memberikan instruksi khusus untuk mengganti record/data, 
//    misalnya hanya mengganti beberapa field saja.
// c. PUT memiliki fungsi ganda, bisa mengganti record/data dan bisa menambahkan juga sama halnya seperti POST. 
//    PATCH berfungsi khusus untuk mengganti record/data saja.
// x PUT digunakan ketika kita mengganti sebuah record/data secara seutuhnya. 
//    PATCH akan memberikan instruksi khusus untuk mengganti record/data, misalnya hanya mengganti 
//    beberapa field saja.



// 18. Perhatikan code berikut!
/*
    app.get('/products/:uid', async(req, res) => {
        res.send(`Get Products with Id ${req.params.id} Success`)
    })

    app.get('/products/category', async(req, res) => {
        res.send(`Get Products with Category Success`)
    })
*/
// Apa response yang diberikan apabila kita mengakses endpoint /products/category?
// a. Server tidak memberikan response karena terjadi error
// x `Get Products with Id category Success`
// c. `Get Products with Category Success`
// d. Semua jawaban salah



// 19. Perhatikan code berikut!
/*
    const middlewareFunct = (req, res, next) => {
        res.send(`Response from middlewareFunct`)
        next()
    }

    const secondController = (req, res, next) => {
        res.send(`Response from secondController`)
        next()
    }

    app.get('/test' middlewareFunct, secondController)
*/
// Apa response yang kita dapatkan ketika request menuju endpoint /test?
// a. `Response from middlewareFunct`
// b. `Response from secondController`
// c. Tidak ada response, karena function next() di masing-masing middleware
// x Server error



// 20. Query apa yang kita gunakan untuk mendapatkan para user yang memiliki firstname yang 
//     diawali dengan huruf "J"?
// a. SELECT * FROM users WHERE firstname LIKE "%j"
// b. SELECT * FROM users WHERE firstname STARTS WITH ('J')
// c. SELECT * FROM users WHERE firstname = 'J'
// x SELECT * FROM users WHERE firstname LIKE "j%"



// 21. Kamu ditugaskan untuk membuat database employee (pegawai). 
//     Kamu harus membuat fitur untuk mencatat posisi dan gaji employee saat ini, 
//     beserta dengan history posisi dan gaji employee tersebut. 
//     Bagaimana cara kita membuat design database yang paling tepat untuk fitur ini?
// a. Membuat 1 table employee yang menyimpan data utama (nama, email, alamat) employee, 
//    dan menyimpan history employee di dalam cache server
// b. Membuat 3 table dengan relasi one-to-many. Table pertama untuk menyimpan data 
//    utama employee, table kedua menyimpan history posisi dan gaji employee, 
//    table ketiga sebagai connector yang menyimpan 2 foreign key
// x Membuat 2 table dengan relasi one-to-many. Table pertama untuk menyimpan data 
//    utama employee, table kedua menyimpan history posisi dan gaji employee. 
//    Dihubungkan dengan foreign key
// d. Semua jawaban salah