import React, {
    Component
  } from 'react'

import Sharpen from './../lib/sharpen'
import OilPainting from './../lib/oilPaint'
import Darken from './../lib/darken'
import Aging from './../lib/agingStyle'
import EmbossMent from './../lib/embossment'
import Mosaic from './../lib/mosaic'
import Revert from './../lib/revert'
import Opacity from './../lib/opacity'
import Binary from './../lib/binary'
import rgba from './../lib/rgba'
import Convolution from './../lib/convolution'
import './app.scss'
let rawImage
const ua = window.navigator.userAgent
let Orientation
class App extends Component {

    state = {
        height: '',
        width: '',
        originData: [],
        imgData: {},
        data: null,
        path: '',
        radio: 1,
        base64Img: '',
        color: ''
    }
    componentDidMount() {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        const img = document.getElementById('img')
        img.onload = () => {
            // this.setState({ style: window.getComputedStyle(img) })
            const ws = window.getComputedStyle(img).width.replace('px', '')
            const hs = window.getComputedStyle(img).height.replace('px', '')
            canvas.width = ws
            canvas.height = hs
            this.setState({
                height: hs,
                width: ws
            })
            const radio = this.getPixelRatio(ctx)
            this.setState({ radio })
            // 制作水印
            var markCanvas = document.createElement("canvas");
            var markContext = markCanvas.getContext('2d');
            markCanvas.width = 150;
            markCanvas.height = 40;

            markContext.font = "20px serif";
            markContext.fillStyle = "rgba(0, 0, 0, 0.5)";
            markContext.fillText("@版权所有", 0, 20);
            // 绘制图片
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height )
            ctx.drawImage(markCanvas, 0, 0, 150, 40 )

            rawImage = ctx.getImageData(0, 0, ws * radio, hs * radio)
            this.setState({ imgData: ctx.getImageData(0, 0, ws * radio, hs * radio) })
            console.log('Uint8ClampedArray数据:')
            console.log(ctx.getImageData(0, 0, ws, hs))

        }
        canvas.addEventListener('mousemove', this.canvasPicker)
    }

    ctxDrawImg = (ori, w, h) => {
        const img = document.getElementById('img')
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        const {radio} = this.state
        if ((ori && ori != 1)) {
            console.log('旋转拉')
            console.log(ori)
            switch (ori) {
                case 6: //旋转90度
                    ctx.rotate(Math.PI / 2);
                    ctx.drawImage(img, 0, -h*radio, w*radio, h*radio )
                    break;
                case 3: //旋转180度
                    ctx.rotate(Math.PI); 
                    ctx.drawImage(img, -w, -h*radio, w*radio, h*radio )
                    break;
                case 8:
                    ctx.rotate(3 * Math.PI / 2);    
                    ctx.drawImage(img, -w*radio, 0, w*radio, h*radio )
                    break;
                default: 
                    ctx.drawImage(img, 0, 0, w*radio, h*radio )
            }
        } else {
            ctx.drawImage(img, 0, 0, w*radio, h*radio )
        }
    }

    canvasPicker = (e) => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        var x = e.layerX
        var y = e.layerY
        var pixel = ctx.getImageData(x, y, 1, 1)
        var data = pixel.data
        console.log(data)
        var rgba = 'rgba(' + data[0] + ',' + data[1] + ',' + data[2] + data[3]/255 + ')'
        this.setState({ color: rgba })
    }

    // 获取canvas宽展比例，解决canvas中分辨率低的问题
    getPixelRatio = (context) => {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1
    
        return (window.devicePixelRatio || 1) / backingStore
    }

    // 复古风格
    handleAging = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        let imgData = this.state.imgData

        const output = Aging(imgData)
        ctx.putImageData(output, 0, 0)
    }
    // 黑白风格
    handleAshing = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        let imgData = this.state.imgData

        const output = Darken(imgData)
        ctx.putImageData(output, 0, 0)
    }
    // 油画
    handleIolPanit = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        let imgData = this.state.imgData

        const processImg = OilPainting(imgData, 2, 5)
        ctx.putImageData(processImg, 0, 0)
    }
    // 锐化
    handleSharpen = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        let imgData = this.state.imgData

        const processImg = Sharpen(imgData, 0.7)
        ctx.putImageData(processImg, 0, 0)
    }
    // 浮雕效果
    handleEmbossing = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        let imgData = this.state.imgData

        const processImg = EmbossMent(imgData)
        ctx.putImageData(processImg, 0, 0)
    }
    // 马赛克
    handleMosaic = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        let imgData = this.state.imgData

        const processImg = Mosaic(imgData, 30)
        ctx.putImageData(processImg, 0, 0)
    }
    // 反色
    handleRevert = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        let _imgData = this.state.imgData

        const processImg = Revert(_imgData)
        ctx.putImageData(processImg, 0, 0)
    }
    // 半透明
    handleOpacity = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')

        let _imgData = this.state.imgData

        const processImg = Opacity(_imgData, 0.5)
        ctx.putImageData(processImg, 0, 0)
    }

    // 还原
    handleBack = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        ctx.putImageData(rawImage, 0, 0)
    }
    // 二值化
    handleBinary = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')

        let _imgData = this.state.imgData

        const processImg = Binary(_imgData, 100)
        ctx.putImageData(processImg, 0, 0)
    }

    handleRGBA = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')

        let _imgData = this.state.imgData

        const processImg = rgba(_imgData, 255, 0 ,0 ,1)
        ctx.putImageData(processImg, 0, 0)
    }

    handleConvolution = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')

        let _imgData = this.state.imgData
        const kernel = [-1, 0, 1, -2, 0, 2, -1, 0, 1]
        const processImg = Convolution(_imgData, kernel)
        ctx.putImageData(processImg, 0, 0)

    }

    // 读取图像元信息
    handleFileChange = (e) => {

        const file = e.target.files[0]
        const input = document.querySelector('input')
        // if (file) {
        //     EXIF.getData(file, function() {
        //         Orientation = EXIF.getTag(this, 'Orientation')
        //     })
        // }
        
        /**
         * 图片转base64
         * 如果存在兼容性问题，可以使用canvas.toDataURL方法转成base64
         * */
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            this.setState({ base64Img: reader.result })
          }, false)
        reader.readAsDataURL(file)
        
        // 兼容性
        const URL = window.URL || window.webkitURL
        this.setState({ 
            data: file, 
            path: URL.createObjectURL(input.files[0])
        })
        
    }

    upload = () => {
        const data = this.state.data
        if (!data) {
            console.log('upload first！')
            return
        }
        const form = new FormData()
        console.log(form)
    }

    render () {
        
        const { width, height, radio, color } = this.state
        const canvasStyle = {
            width: width + 'px',
            height: height + 'px'
        }
        const colorPicker = {
            color: color
        }
        return (
            <div>
                <div className="operator">

                </div>
                <div className = "appWrapper">
                    <button onClick={this.handleAging}>复古风格</button>
                    <button onClick={this.handleAshing}>黑白风格</button>
                    <button onClick={this.handleIolPanit}>油画风格</button>
                    <button onClick={this.handleSharpen}>锐化</button>
                    <button onClick={this.handleMosaic}>马赛克</button>
                    <button onClick={this.handleEmbossing}>浮雕风格</button>
                    <button onClick={this.handleRevert}>反色</button>
                    <button onClick={this.handleOpacity}>半透明</button>
                    <button onClick={this.handleBinary}>二值化</button>
                    <button onClick={this.handleRGBA}>仿rgba</button>
                    <button onClick={this.handleConvolution}>卷积运算</button>
                    <button onClick={this.handleBack}>原图</button>
                    <div>
                        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={this.handleFileChange} />
                    </div>
                    <div className="img-wrap">
                        <img id="img" src={this.state.path} />
                    </div>
                    <p style={colorPicker}>颜色选择器</p>
                    <div className="canvas-wrap">
                        <canvas id = "canvas" width={width*radio} height={height*radio} style={canvasStyle} />
                    </div>

                </div>
            </div>
        )
    }
}

export default App