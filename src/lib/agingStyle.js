/**
 * 复古风格
 * @param {Object} imageData  imageData对象 
 */

function Aging (imageData) {
    
    let index, r, g, b
    const data = imageData.data
    const width = imageData.width
    const height = imageData.height
    
    for (let y = 1; y <= height; y++) {
        // 按列扫描
        for (let x = 1; x <= width; x++) {
            // rgb处理
            index = (y * width + x) * 4
            r = data[index]
            g = data[index + 1]
            b = data[index + 2]
            // r
            data[index] = (r * 0.393) + (g * 0.769) + (b * 0.189)
            // g
            data[index + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168)
            // b
            data[index + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131)
            // alpha
            data[index + 3] = 255;
        }
    }
    return imageData
}

export default Aging