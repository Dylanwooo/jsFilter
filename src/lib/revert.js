/**
 * 反色风格
 * @param {Object} imageData  imageData对象 
 */

function Revert (imageData) {
    const data = imageData.data
    // RGB通道所有亮度值取反
    for(var i = 0,n = data.length; i < n;i += 4){
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
    }

    return imageData
}

export default Revert