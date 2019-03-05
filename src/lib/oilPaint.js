/**
 * 油画风格
 * @param {Object} imageData  imageData对象 
 * @param {Number} range 模糊范围
 * @param {Number} levels 模糊程度
 */

 // TODO
function OilPainting (imgData, range, levels) {
    const data = imgData.data
    const width = imgData.width
    const height = imgData.height

    var index = 0,
        rh = [],
        gh = [],
        bh = [],
        rt = [],
        gt = [],
        bt = [],
        x, y, i, row, col,
        rowIndex, colIndex, offset, srcIndex,
        sr, sg, sb, ri, gi, bi,
        r, g, b;

    for (y = 0; y < height; y += 1) {
        for (x = 0; x < width; x += 1) {
            for (i = 0; i < levels; i += 1) {
                rh[i] = gh[i] = bh[i] = rt[i] = gt[i] = bt[i] = 0;
            }
            
            for (row = -range; row <= range; row += 1) {
                rowIndex = y + row;
                
                if (rowIndex < 0 || rowIndex >= height) {
                    continue;
                }
                
                offset = rowIndex * width;
                
                for (col = -range; col <= range; col += 1) {
                    colIndex = x + col;
                    if (colIndex < 0 || colIndex >= width) {
                        continue;
                    }
                    
                    srcIndex = (offset + colIndex) << 2;
                    sr = data[srcIndex];
                    sg = data[srcIndex + 1];
                    sb = data[srcIndex + 2];
                    ri = (sr * levels) >> 8;
                    gi = (sg * levels) >> 8;
                    bi = (sb * levels) >> 8;
                    rt[ri] += sr;
                    gt[gi] += sg;
                    bt[bi] += sb;
                    rh[ri] += 1;
                    gh[gi] += 1;
                    bh[bi] += 1;
                }
            }

            r = g = b = 0;
            for (i = 1; i < levels; i += 1) {
                if(rh[i] > rh[r]) {
                    r = i;
                }
                if(gh[i] > gh[g]) {
                    g = i;
                }
                if(bh[i] > bh[b]) {
                    b = i;
                }
            }

            data[index]     = rt[r] / rh[r] | 0;
            data[index + 1] = gt[g] / gh[g] | 0;
            data[index + 2] = bt[b] / bh[b] | 0;
            data[index + 3] = data[index + 3];
            index += 4;
        }
    }

    return imgData
}

export default OilPainting