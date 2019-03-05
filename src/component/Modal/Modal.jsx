import React, {
  Component
} from 'react';
import PropTypes from 'prop-types';

class Modal extends Component {

  static propTypes = {
    handleClose: PropTypes.func,
    wrapStyle: PropTypes.object,
    btnObj: PropTypes.object
  } 

  render() {
    const { 
      /**
       * 弹框内具体的内容，通过外部传入
       * @type {Jsx}
       */
      children, 
      /**
       * 弹框包裹样式
       * @type {Object}
       */
      wrapStyle, 
      /**
       * 关闭按钮
       * @param {Object} param
       * @param {String} param.url 关闭按钮图片
       * @param {String} param.position 关闭按钮上下位置情况
       * @param {Object} param.style 关闭按钮样式，位置
       */
      btnObj, 
      /**
       * 弹框关闭处理事件
       * @type {Function}
       */
      handleClose 
    } = this.props

    const closeStyle = Object.assign({
      ...initialBtn
    },btnObj.style)

    const contentStyle = Object.assign({
      ...initContentStyle
    },wrapStyle)

    return (
      <div style={style.initial}>
        {btnObj && btnObj.position === 'top' && 
        <img src={btnObj.img} style={closeStyle} onClick={handleClose}/> }

        <div style={contentStyle}>
          {children}
        </div>

        {btnObj && btnObj.position === 'down' && 
        <img src={btnObj.url} style={closeStyle} onClick={handleClose}/> }
      </div>
    )
  }
}

const style = {
  initial: {
    position: 'fixed',
    zIndex: '999',
    background: 'rgb(0,0,0,.8)',
    width: '100%',
    height: '100%'
  }
}

const initContentStyle = {
  backgroundPosition: 'center',
  zIndex: '999',
  backgroundSize: '100%',
}

const initialBtn = {
  backgroundPosition: 'center',
  backgroundSize: '100%',
  position: 'absolute'
}

export default Modal