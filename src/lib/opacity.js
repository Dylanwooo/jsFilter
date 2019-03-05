/**
 * 半透明效果
 * @param {Object} imageData
 * @param {Number} opacity  0-1范围
 */

function Opacity (imageData, opacity) {
    const data = imageData.data
    opacity = parseInt(opacity * 255)

    for (var i = 0; i < data.length; i += 4) {
        data[i+3] = opacity
    }

    return imageData
}

export default Opacity