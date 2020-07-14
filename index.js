const db = require('./db.js')

// 面向接口编程
module.exports.add = (title) => {
    // 读取之前的任务
    const list = db.read()
    // 往里面添加任务
    list.push({ title, done: false })
    // 保存文件
    db.write(list)
}