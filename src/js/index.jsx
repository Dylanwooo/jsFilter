import '../css/reset.scss'
import 'whatwg-fetch'
import React from 'react'
import { render } from 'react-dom'

import App from '../container/app'


render(
  <App />,
  document.getElementById('app')
)
