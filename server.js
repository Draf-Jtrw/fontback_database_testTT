const express = require('express')
const app = express()
const port = 5000
const bodyParser = require('body-parser')
const path = require('path')

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

app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

// Routes
const usersRoutes = require('./routes/users')
const exp = require('constants')
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