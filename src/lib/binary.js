/**
 * 图像二值化，灰度阈值
 * @param {Object} imageData
 * @param {Number} threshold 阈值
 */
import Darken from './darken'

function Binary(imageData, threshold) {
    const data = Darken(imageData).data

    for (var i = 0, n=data.length; i < n; i++ ) {
        if ((i+1)%4) {
            data[i] = data[i] > threshold ? 255 : 0
        }
    }
    return imageData
}

export default Binary