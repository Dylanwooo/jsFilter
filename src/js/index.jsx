import '../css/reset.scss'
import 'whatwg-fetch'
import React from 'react'
import { render } from 'react-dom'
import App from '../container/app'
import VConsole from './../static/vconsole'
var vConsole = new VConsole()

render(
  <App />,
  document.getElementById('app')
)
