/**
 * css rgba函数实现
 * @param {Object} imageData
 */

function rgba(imageData, r, g, b, a) {
    const data = imageData.data

    for (var i=0; i < data.length; i += 4) {
        data[i] = r
        data[i+1] = g
        data[i+2] = b
        data[i+3] = parseInt(a * 255)
    }
    return imageData
}

export default rgba