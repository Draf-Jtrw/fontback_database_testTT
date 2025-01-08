const express = require('express')  // ใช้สร้างเซิร์ฟเวอร์และจัดการ routing
const app = express()   
const port = 5000
const bodyParser = require('body-parser')   // ใช้ดึงข้อมูลคำขอ http เช่น html, json
const path = require('path')    // จัดการ path ไฟล์

// เช็คว่า connect กับ database หรือยัง
const mysql = require('mysql')
const dotenv = require('dotenv')
dotenv.config({ path: './.env' })
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
})
db.connect((error) => {
    if(error) {
        console.log(error)
    } else {
        console.log('MySQL Connect DATA')
    }
})
// -------------------------------------------

app.set('view engine', 'ejs')   // กำหนดให้ ejs เป็นเทมเพลตสำหรับการเรนเดอร์หน้าเว็บ
app.use(express.json()) // เป็นใช้งานจัดการคำขอรูปแบบ json
app.use(bodyParser.urlencoded({ extended: true }))  // จัดการฟอร์ม html ข้อมูลที่ส่งมาจะเป็น key-value
app.use(express.static(path.join(__dirname, 'public'))) // กำหนด public โฟลเดอร์ที่เก็บไฟล์ css, js, รูปภาพ

// Routes
const usersRoutes = require('./routes/users')   
app.use('/users', usersRoutes)

app.get('/', (req, res) => {
    res.redirect('users')
})

app.use((req, res) => {
    res.status(404).render('404')
})


// Start server
app.listen(port, () => {
    console.log("Server run port ", port)
})