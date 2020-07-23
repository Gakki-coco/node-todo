const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

const mocks = {}

fs.setMock = (path, error, data) => {
    mocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
    // 如果 options 不传
    if (callback === undefined) {
        callback = options
    }
    // 如果被 mock 过就不走真正的 readFile
    if (path in mocks) {
        callback(...mocks[path])
    } else {
        _fs.readFile(path, options, callback)
    }
}

module.exports = fs