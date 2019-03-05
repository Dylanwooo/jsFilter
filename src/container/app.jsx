import React, {
    Component
  } from 'react'
import Sharpen from './../lib/sharpen'
import OilPainting from './../lib/oilPaint'
import Darken from './../lib/darken'
import Aging from './../lib/agingStyle'
import EmbossMent from './../lib/embossment'
import Mosaic from './../lib/mosaic'

import './app.scss'

class App extends Component {

    state = {
        height: '',
        width: '',
        originData: [],
        imgData: {},
        data: null,
        path: '',
        radio: 1,
        base64Img: ''
    }
    componentDidMount() {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        const img = document.getElementById('img')
        img.onload = () => {
            this.setState({ style: window.getComputedStyle(img) })
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
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
            const originData = ctx.getImageData(0, 0, ws, hs).data
            this.setState({ imgData: ctx.getImageData(0, 0, ws, hs) })
            console.log(ctx.getImageData(0, 0, ws, hs))
            this.setState({ originData })
        }
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
        console.log('change!')
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

    handleMosaic = () => {
        const canvas = document.getElementById('canvas')
        const ctx = canvas.getContext('2d')
        let imgData = this.state.imgData
        const processImg = Mosaic(imgData, 5)
        ctx.putImageData(processImg, 0, 0)
    }
    // 读取图像元信息
    handleFileChange = (e) => {
        // if (!file) return

        const file = e.target.files[0]
        const input = document.querySelector('input')
        /**
         * 图片转base64
         * 如果存在兼容性问题，可以使用canvas.toDataURL方法转成base64
         * */
        const reader = new FileReader()
        reader.addEventListener("load", () => {
            this.setState({ base64Img: reader.result })
          }, false)
        reader.readAsDataURL(file)
        
        console.log(window.URL.createObjectURL(input.files[0]))
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
        const canvasStyle = {
            width: this.state.width + 'px',
            height: this.state.height + 'px'
        }
        return (
            <div className = "appWrapper">
                <button onClick={this.handleAging}>复古风格</button>
                <button onClick={this.handleAshing}>黑白风格</button>
                <button onClick={this.handleIolPanit}>油画风格</button>
                <button onClick={this.handleSharpen}>锐化</button>
                <button onClick={this.handleMosaic}>马赛克</button>
                <button onClick={this.handleEmbossing}>浮雕风格</button>
                <div>
                    <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={this.handleFileChange} />
                </div>
                {/* <div className="upload" onClick={this.upload}>upload</div> */}
                <div>
                    <img id="img" src={this.state.path} />
                    {/* <div className="mask"></div> */}
                </div>
                {/* <canvas id = "canvas" width={this.state.width*2} height={this.state.height*2} style={canvasStyle}></canvas> */}
                <canvas id = "canvas" style={canvasStyle}></canvas>

            </div>
        )
    }
}

export default App