const mysql = require('mysql2/promise') // เชื่อมต่อ MySQL รองรับคำสั่งแบบ promise
const dotenv = require('dotenv')    // โหลดตัวแปรจากไฟล์ .env
dotenv.config({ path: './.env' })   // กำหนด path ไฟล์ทำให้เข้าถึง process.env

const db = mysql.createPool({   // mysql.createPool ใช้สร้างและจัดการชุดของการเชื่อต่อที่สามารถนำกลับมาใช้ใหม่ได้โดยไม่ต้องสร้างใหม่
    host: process.env.DB_HOST,  // ที่อยู่ของเซิร์ฟเวอร์
    user: process.env.DB_USER,  // ชื่อผู้ใช้ฐานข้อมูล
    password: process.env.DB_PASS,  // รหัสผ่าน
    database: process.env.DB_NAME   // ชื่อของ database
})

// ส่งออกโมดูลไปยังไฟล์อื่น
module.exports = db