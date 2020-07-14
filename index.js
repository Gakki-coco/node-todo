const db = require('./db.js')

// 面向接口编程
module.exports.add = async (title) => {
    // 读取之前的任务
    const list = await db.read()
    // 往里面添加任务
    list.push({ title, done: false })
    // 保存文件
    await db.write(list)
}

module.exports.clear = async ()=> {
    await db.write([])
}