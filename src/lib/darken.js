/**
 * 黑白风格
 * @param {Object} imageData  imageData对象 
 */

function Darken (imageData) {
    var index
    const data = imageData.data
    const width = imageData.width
    const height = imageData.height

    for (let y = 1; y <= height; y++) {
        // 按列扫描
        for (let x = 1; x <= width; x++) {
            // rgb处理
            index = (y * width + x) * 4
            let avg = 0.2126 * data[index] + 0.7152 * data[index + 1] + 0.0722 * data[index + 2];
            data[index] = avg
            data[index + 1] = avg
            data[index + 2] = avg
            // alpha
            data[index + 3] = 255
        }
    }
    return imageData
}

export default Darken