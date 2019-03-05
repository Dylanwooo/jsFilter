/**
 * 马赛克效果
 * 
 * 基本思想： 
 * 取一个blockSize大小的区块，取该区块内所有像素值的平均值作为该区块内所有像素的值
 * @param {Object} imageData
 * @param {Number} blockSize
 */

function Mosaic (imageData, blockSize) {
    const data = imageData.data
    const width = imageData.width
    const height = imageData.height

    var cols = Math.ceil(width / blockSize),
        rows = Math.ceil(height / blockSize),
        row, col,
        x_start, x_end, y_start, y_end,
        x, y, yIndex, index, size,
        r, g, b, a;

    for (row = 0; row < rows; row += 1) {
        y_start = row * blockSize;
        y_end   = y_start + blockSize;
        
        if (y_end > height) {
            y_end = height;
        }
        
        for (col = 0; col < cols; col += 1) {
            // 选定区块
            x_start = col * blockSize;
            x_end   = x_start + blockSize;
            // 如果区块大小大于图片宽度，取图片宽，此时整张图片一个色值
            if (x_end > width) {
                x_end = width;
            }

            // 获取每个区块的平均色值
            r = g = b = a = 0;
            size = (x_end - x_start) * (y_end - y_start);

            for (y = y_start; y < y_end; y += 1) {
                yIndex = y * width;
                
                for (x = x_start; x < x_end; x += 1) {
                    index = (yIndex + x) << 2;
                    r += data[index];
                    g += data[index + 1];
                    b += data[index + 2];
                    a += data[index + 3];
                }
            }

            r = (r / size) + 0.5 | 0;
            g = (g / size) + 0.5 | 0;
            b = (b / size) + 0.5 | 0;
            a = (a / size) + 0.5 | 0;

            // fill the dst with that color
            for (y = y_start; y < y_end; y += 1) {
                yIndex = y * width;
                
                for (x = x_start; x < x_end; x += 1) {
                    index = (yIndex + x) << 2;
                    data[index]     = r;
                    data[index + 1] = g;
                    data[index + 2] = b;
                    data[index + 3] = a;
                }
            }
        }
    }
    return imageData
}

export default Mosaic