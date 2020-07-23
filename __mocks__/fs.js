const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

let readMocks = {}

fs.setReadFileMock = (path, error, data) => {
    readMocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
    // 如果 options 不传
    if (callback === undefined) {
        callback = options
    }
    // 如果被 mock 过就不走真正的 readFile
    if (path in readMocks) {
        callback(...readMocks[path])
    } else {
        _fs.readFile(path, options, callback)
    }
}

let writeMocks = {}

fs.setWriteFileMock = (path, fn) => {
    writeMocks[path] = fn
}

fs.writeFile = (path, data, options, callback) => {
    // 如果 options 不传
    if (callback === undefined) {
        callback = options
    }

    if (path in writeMocks) {
        writeMocks[path](path, data, options, callback)
    } else {
        _fs.writeFile(path, data, options, callback)
    }
}

fs.clearMocks = () => {
    readMocks = {}
    writeMocks = {}
}

module.exports = fs