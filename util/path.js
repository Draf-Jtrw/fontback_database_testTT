// จัดการเส้นทางไฟล์
const path = require('path')

// กำหนดสิ่งที่โมดูลนี้จะส่งคืนเมื่อมีการ require โมดูลจากไฟล์อื่น
module.exports = path.dirname(process.mainModule.filename)