const express = require('express')
const router = express.Router()
const db = require('../config/db')

// แสดงตารางผู้ใช้
router.get('/', async (req, res) => {
    try {
        const [users] = await db.query('SELECT * FROM users')
        res.render('index', {users})
    } catch (err) {
        console.error(err)
    }
})
// แสดงหน้ารายละเอียดผู้ใช้
router.get('/:id', async (req, res) => {
    try {
        const [user] = await db.query('SELECT * FROM users WHERE id=?', [req.params.id])
        if([user.length > 0]) {
            res.render('detail', {user: user[0]})
        } else {
            res.redirect('/users')
        }
    } catch (err) {
        console.error(err)
    }
})

// เพิ่มผู้ใช้
router.post('/add/:id', async (req, res) => {
    try {
        console.log(req.body)
        const { hn, firstname, lastname, phone_number, email } = req.body
        const name = firstname + ' ' + lastname
        await db.query('INSERT INTO users (hn, name, phone_number, email) VALUES (?, ?, ?, ?)', [hn, name, phone_number, email])
        res.redirect('/users')
    } catch (err) {
        console.error(err)
    }
})

// อัปเดตข้อมูลผู้ใช้
router.post('/update/:id', async (req, res) => {
    try {        
        console.log(req.body)
        const { hn, firstname, lastname, phone_number, email } = req.body
        const name = firstname + ' ' + lastname
        await db.query('UPDATE users SET hn=?, name=?, phone_number=?, email=? WHERE id=?', [hn, name, phone_number, email, req.params.id])
        res.redirect('/users')
    } catch (err) {
        console.error(err)
    }
})

// ลบผู้ใช้
router.post('/delete/:id', async (req, res) => {
    try {
        console.log(req.body)
        await db.query('DELETE FROM users WHERE id=?', [req.params.id])
        res.redirect('/users')
    } catch (err) {
        console.error(err)
    }
})


module.exports = router