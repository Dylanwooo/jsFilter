/**
 * 卷积处理函数
 * @param {Object} imageData
 * @param {Array} kernel 卷积核
 */

function Convolution(imageData, kernel) {
    const data = imageData.data
    const _d = data
    const width = imageData.width
    const height = imageData.height
    for (let y = 1; y < height-1; y++) {
        // 按列扫描
        for (let x = 1; x < width-1; x++) {

            for (let c = 0; c < 3; c++) {
                let i = (y * width + x) * 4 + c
                data[i] = 
                    ( kernel[0] * _d[i - width*4-4] + 
                      kernel[1] * _d[i - width*4] + 
                      kernel[2] * _d[i - width*4 + 4] + 
                      kernel[3] * _d[i - 4] + 
                      kernel[4] * _d[i] + 
                      kernel[5] * _d[i + 4] + 
                      kernel[6] * _d[i + width*4 - 4] + 
                      kernel[7] * _d[i + width*4] + 
                      kernel[8] * _d[i + width*4 + 4] 
                    )
            }
        }
    }
    return imageData
}

export default Convolution