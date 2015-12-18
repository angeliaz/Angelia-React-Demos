import React from 'react'
import App from './component/App.js'

var data = {
  logo: '',
  title: 'title1',
  desc: 3
}

React.render(
  <App data={data}/>,
  document.getElementById('mount-dom')
  )